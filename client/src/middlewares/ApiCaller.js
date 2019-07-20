import fetch from 'cross-fetch';

function buildQueryString(params){
	if(Object.keys(params).length === 0)
		return '';

	const encode = encodeURIComponent;
	return '?' + params.map(k => encode(k) + '=' + encode(params[k])).join('&');
}

export default function createApiCaller(params){

	let options = {...params};

	const call = (store, next, action) => {
		const api = action.meta.api;

		let query = buildQueryString(api.query || {});

		let fetchOptions = {
			method: api.method,
			headers: {
				'Accept': 'application/json',
			},
		};

		if(api.body){
			fetchOptions.headers['Content-type'] = 'application/json';
			fetchOptions.body = JSON.stringify(api.body);
		}

		return fetch(options.url + api.path + query, fetchOptions)
			.then(res => {
				switch(res.status){
					case 200:
					case 201:
					case 202:
						return res.json()
							.then(data => {
								return next({
									...action,
									payload: data,
									meta: {
										...action.meta,
										api: undefined,
									},
								})
							});

					default:
						return next({
							...action,
							payload: {
								status: res.status,
								message: res.statusText,
							},
							error: true,
							meta: {
								...action.meta,
								api: undefined,
							},
						});
				}
			})
			.catch(err => {
				return next({
					...action,
					payload: {
						status: null,
						message: err,
					},
					error: true,
					meta: {
						...action.meta,
						api: undefined,
					},
				});
			});
	};

	return store => next => action => {
		next(action);

		if(action.meta.api){
			return call(store, next, action);
		}
	};

};

