import jwt from 'jsonwebtoken';
import { newAuthenticationError } from '../errors/ResponseError';

export default function tokenCheck(req, res, next){
	const authHeader = (req.headers['authorization'] || '').trim();
	if(!authHeader)
		throw newAuthenticationError(401, {message: 'token_required'});
	if(!/^Bearer /.test(authHeader))
		throw newAuthenticationError(401, {error: 'invalid_token'});

	const token = authHeader.replace(/^Bearer /, '');

	jwt.verify(token, req.app.get('jwtSecretToken'), (err, decoded) => {
		if(err)
			throw newAuthenticationError(401, {error: 'invalid_token'});

		req.auth = {
			id: decoded.id,
		};
		next();
	});
}

