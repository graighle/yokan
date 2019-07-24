export class ResponseError extends Error {
	constructor(args = {}){
		super();

		this.name = 'ResponseError';
		if('message' in args)
			this.message = args.message;
		if('status' in args)
			this.status = args.status;
		if('headers' in args)
			this.headers = args.headers;
	}
};

export function newAuthenticationError(status, options = {}){
	let params = {
		status,
		message: options.message || '',
		headers: {
			'WWW-Authenticate': 'realm="yokan_api"' + (options.error ? ', error="' + options.error + '"' : ''),
		},
	};

	return new ResponseError(params);
}

export function newClientError(status, options = {}){
	let params = {
		status,
	};

	return new ResponseError(params);
}

export function newServerError(status, options = {}){
	let params = {
		status,
	};

	return new ResponseError(params);
}

