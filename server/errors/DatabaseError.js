import { ResponseError } from './ResponseError';

export class DatabaseError extends ResponseError {
	constructor(args = {}){
		super(args);

		this.name = 'DatabaseError';
	}
};

