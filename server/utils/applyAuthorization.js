import jwt from 'jsonwebtoken';

export default function applyAuthorization(req, res, next){
	const authHeader = (req.headers['authorization'] || '').trim();
	if(authHeader && /^Bearer /.test(authHeader)){
		const token = authHeader.replace(/^Bearer /, '');

		jwt.verify(token, req.app.get('jwtSecretToken'), (err, decoded) => {
			if(!err){
				req.auth = {
					id: decoded.id,
				};
			}
			next();
		});
	}else{
		next();
	}
}

