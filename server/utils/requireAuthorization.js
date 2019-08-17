import { newAuthenticationError } from '../errors/ResponseError';

export default function requireAuthorization(req, res, next){
	if(!req.auth)
		throw newAuthenticationError(401, {error: 'valid_token_required'});

	next();
}

