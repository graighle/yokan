import Ajv from 'ajv';
import co from 'co';
import jwt from 'jsonwebtoken';
import { database } from '../db/mongo';
import { USERS } from '../db/collections';
import { newClientError } from '../errors/ResponseError';

const ajv = new Ajv();

const validateSignInBody = ajv.compile({
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
});

export function signIn(req, res, next){

	let userFilter = {
	};

	if(req.body && Object.keys(req.body).length !== 0){
		// Request check.
		if(!req.is('application/json'))
			throw newClientError(400, {'error': 'invalid_request'});

		// Body check.
		if(!validateSignInBody(req.body))
			throw newClientError(400, {'error': 'invalid_request'});

		userFilter.id = req.body.id;
		userFilter.password = req.body.password;
	}else if(req.auth){
		userFilter.id = req.auth.id;
	}

	co(function*(){
		let db = yield database();

		const user = yield db.collection(USERS)
			.findOne(userFilter);
		if(!user)
			throw newClientError(401);

		const auth = {
			id: user.id,
		};

		const token = jwt.sign(auth, req.app.get('jwtSecretToken'), { expiresIn: '50000h' });
		return {
			accessToken: token,
			user: {
				...user,
				_id: undefined,
				password: undefined,
			},
		};
	})
	.then(val => res.send(val))
	.catch(next);
}

