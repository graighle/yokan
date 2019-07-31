import Ajv from 'ajv';
import co from 'co';
import { ResponseError, newAuthenticationError, newClientError } from '../errors/ResponseError';
import { DatabaseError } from '../errors/DatabaseError';
import { database } from '../db/mongo';
import { USERS } from '../db/collections';

const ajv = new Ajv();

export function getSetup(req, res, next){

	let setup = {
		ready: false,
		server: true,
		database: false,
		admin: false,
		message: '',
	};

	co(function*(){
		// Check database.
		let db = yield database();
		setup.database = true;

		// Check administrator.
		setup.admin = (yield db.collection(USERS).findOne({admin:'1'})) !== null;
		if(!setup.admin)
			return setup;

		setup.ready = true;
		return setup;
	})
	.then(setup => {
		res.send(setup);
	}, err => {
		if(err instanceof DatabaseError){
			setup.message = err.message;
			res.send(setup);
		}else{
			throw err;
		}
	})
	.catch(next);

};

const validatePostSetupBody = ajv.compile({
	type: 'object',
	properties: {
		admin: {
			type: 'object',
			properties: {
				id: {
					type: 'string',
					minLength: 1,
				},
				password: {
					type: 'string',
					minLength: 1,
				},
			},
			required: ['id', 'password'],
		},
	},
	required: ['admin'],
});

export function postSetup(req, res, next){

	// Request check.
	if(!req.is('application/json'))
		throw newClientError(400, {'error': 'invalid_request'});

	// Body check.
	if(!validatePostSetupBody(req.body))
		throw newClientError(400, {'error': 'invalid_request'});

	const params = req.body;

	let setup = {
		ready: false,
		server: true,
		database: false,
		admin: false,
		message: '',
	};

	co(function*(){
		// Setup database.
		let db = yield database();
		setup.database = true;

		// Check administrator.
		const hasAdmin = (yield db.collection(USERS).findOne({admin:'1'})) !== null;
		if(hasAdmin)
			throw newClientError(403, {'error': 'setup_repetition'});

		// Setup collections.
		setup.admin = yield addAdminUser(db, params.admin);
		if(!setup.admin)
			return setup;

		setup.ready = true;
		return setup;
	})
	.then(setup => {
		res.send(setup);
	}, err => {
		if(err instanceof DatabaseError){
			setup.message = err.message;
			res.send(setup);
		}else{
			throw err;
		}
	})
	.catch(next);

};

async function addAdminUser(db, user){

	const {result} = await db.collection(USERS)
		.insertOne({
			id: user.id,
			password: user.password,
			admin: '1',
		});

	return result.ok === 1;

}

