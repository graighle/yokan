import fetch from 'cross-fetch';

export class FetchError extends Error {
	constructor(args = {}){
		super();

		this.name = 'FetchError';
		this.status = args.status || null;
		this.message = args.message || '';
	}
};

function buildQueryString(params){
	if(Object.keys(params).length === 0)
		return '';

	const encode = encodeURIComponent;
	return '?' + params.map(k => encode(k) + '=' + encode(params[k])).join('&');
}

export default function createApiCaller(params){

	let options = {...params};
	let accessToken = '';

	const processFetch = (url, method, queryData, bodyData) => {
		let query = buildQueryString(queryData || {});

		let fetchOptions = {
			method: method,
			headers: {
				'Accept': 'application/json',
			},
			mode: 'cors',
		};

		if(bodyData){
			fetchOptions.headers['Content-type'] = 'application/json';
			fetchOptions.body = JSON.stringify(bodyData);
		}

		return fetch(url + query, fetchOptions)
			.then(res => {
				switch(res.status){
					case 200:
					case 201:
					case 202:
						return res.json();

					default:
						throw new FetchError({
							status: res.status,
							message: res.statusText,
						});
				}
			})
			.catch(err => {
				if(err instanceof FetchError){
					throw err;
				}else{
					throw new FetchError({
						status: null,
						message: err.message,
					});
				}
			});
		;
	};

	const signIn = (store, next, action) => {
		const api = action.meta.api;

		return processFetch(options.url + api.path, 'POST', api.query || {}, api.body)
			.then(data => {
				accessToken = data.accessToken;
				localStorage.setItem('accessToken', accessToken);
				return data;
			})
			.then(data => next({
				...action,
				payload: data,
				meta: {
					...action.meta,
					api: undefined,
				},
			}))
			.catch(err => next({
				...action,
				payload: {
					status: err.status,
					message: err.message,
				},
				error: true,
				meta: {
					...action.meta,
					api: undefined,
				},
			}))
		;
	};

	const restoreSignIn = (store, next, action) => {
		const token = localStorage.getItem('accessToken');
		if(token)
			accessToken = token;

		return next({
			...action,
			meta: {
				...action.meta,
				api: undefined,
			},
		});
	};

	const signOut = (store, next, action) => {
		localStorage.removeItem('accessToken');

		return next({
			...action,
			meta: {
				...action.meta,
				api: undefined,
			},
		});
	};

	const call = (store, next, action) => {
		const api = action.meta.api;

		return processFetch(options.url + api.path, api.method, api.query || {}, api.body)
			.then(data => next({
				...action,
				payload: data,
				meta: {
					...action.meta,
					api: undefined,
				},
			}))
			.catch(err => next({
				...action,
				payload: {
					status: err.status,
					message: err.message,
				},
				error: true,
				meta: {
					...action.meta,
					api: undefined,
				},
			}))
		;
	};

	return store => next => action => {
		next(action);

		if(action.meta && action.meta.api){
			switch(action.meta.api.method){
				case 'SIGN_IN':
					return signIn(store, next, action);

				case 'RESTORE_SIGN_IN':
					return restoreSignIn(store, next, action);

				case 'SIGN_OUT':
					return signOut(store, next, action);

				default:
					return call(store, next, action);
			}
		}
	};

};

