import { DatabaseError } from '../errors/DatabaseError';
import { Collections, database, collection } from '../lib/mongo';
import co from 'co';

export function getSetup(req, res, next){

	const requiredCollections = Object.values(Collections);

	let setup = {
		ready: false,
		server: true,
		database: false,
		collection: false,
		message: '',
	};

	co(function*(){
		let ready = true;

		// Check database.
		let db = yield database();
		setup.database = true;

		// Check collections.
		let currentCollections = yield db.listCollections().toArray().then(cs => 
			cs.filter(c => c.type === 'collection').map(c => c.name)
		);
		const missingCollections = requiredCollections.filter(c => !currentCollections.includes(c));
		if(missingCollections.length !== 0){
			ready = false;
			missingCollections.forEach(c => {
				console.log('[yokan] Collection not found:' + c);
			});
		}else{
			setup.collection = true;
		}

		setup.ready = ready;
		res.send(setup);
	}).then(undefined, err => {
		if(err instanceof DatabaseError){
			setup.message = err.message;
			res.send(setup);
		}else{
			throw err;
		}
	}).catch(next);

};

