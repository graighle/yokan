import { DatabaseError } from './../errors/DatabaseError';
import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017/yokan';

export const Collections = {
	SYSTEM: 'system',
};

var dbCache = null;

export function database(){

	if(dbCache !== null)
		return Promise.resolve(dbCache);

	return MongoClient.connect(url, {useNewUrlParser:true}).then(client => {
		dbCache = client.db();
		return dbCache;
	}).catch(err => {
		console.dir(err);
		throw new DatabaseError({message:'Failed to connect database.'});
	});

}

export function collection(name){

	return database().then(db => db.collection(name, {strict:true}));

}

