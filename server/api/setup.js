import Ajv from 'ajv';
import co from 'co';
import { ResponseError, newAuthenticationError, newClientError } from '../errors/ResponseError';
import { DatabaseError } from '../errors/DatabaseError';
import { Collections, database } from '../lib/mongo';

const ajv = new Ajv();

export function getSetup(req, res, next){

	let setup = {
		ready: false,
		server: true,
		database: false,
		collection: false,
		message: '',
	};

	co(function*(){
		// Check database.
		let db = yield database();
		setup.database = true;

		// Check collections.
		if(!(yield checkSystemCollection(db)))
			return setup;
		setup.collection = true;

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
		password: {
			type: 'string',
			minLength: 1,
		},
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
	required: ['password'],
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
		collection: false,
		admin: null,
		message: '',
	};

	co(function*(){
		// Setup database.
		let db = yield database();
		setup.database = true;

		if(!(yield checkSystemAuth(db, params.password)))
			throw newAuthenticationError(401);

		// Setup collections.
		if(!(yield setupSystemCollection(db, params)))
			return setup;
		if(params.admin)
			setup.admin = yield addAdminUser(db, params.admin);
		setup.collection = true;

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

function checkSystemAuth(db, password){

	return db.collection(Collections.SYSTEM)
		.findOne({})
		.then(doc => !doc || doc.password === password);

}

function checkSystemCollection(db){

	return db.collection(Collections.SYSTEM)
		.findOne({})
		.then(doc => !!doc);

}

async function setupSystemCollection(db, params){

	const doc = await db.collection(Collections.SYSTEM).findOne({});
	if(doc)
		return true;

	const {result} = await db.collection(Collections.SYSTEM)
		.insertOne({
			password: params.password,
		});

	return result.ok === 1;

}

async function addAdminUser(db, user){

	const doc = await db.collection(Collections.USERS).findOne({
		id: user.id,
	});
	if(doc)
		return false;

	const {result} = await db.collection(Collections.USERS)
		.insertOne({
			id: user.id,
			password: user.password,
			admin: '1',
		});

	return result.ok === 1;

}

