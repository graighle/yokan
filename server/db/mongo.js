import { DatabaseError } from './../errors/DatabaseError';
import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017/yokan';

const clientOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

var dbCache = null;

export function database(){

	if(dbCache !== null)
		return Promise.resolve(dbCache);

	return MongoClient.connect(url, clientOptions).then(client => {
		dbCache = client.db();
		return dbCache;
	}).catch(err => {
		console.dir(err);
		throw new DatabaseError({message:'Failed to connect database.'});
	});

}

