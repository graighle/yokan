import Ajv from 'ajv';
import co from 'co';
import { newClientError, newServerError } from '../errors/ResponseError';
import { DatabaseError } from '../errors/DatabaseError';
import { database } from '../db/mongo';
import { PROJECTS, USERS } from '../db/collections';

const sortings = {
	'id': ['id'],
	'name': ['name', 'id'],
	'created_at': ['created_at', 'id'],
	'updated_at': ['updated_at', 'id'],
	'_': ['id'],
};

const sorter = (sort, asc) => {
	const order = asc ? 1 : -1;
	const cols = (sort in sortings) ? sortings[sort] : sortings['_'];

	return cols.map(c => [c, order]);
};

const ajv = new Ajv();

export function getProject(req, res, next){

	co(function*(){
		let db = yield database();

		const project = yield findProjects(db, {
			id: req.params.project_id,
		});
		if(project.length === 0)
			throw newClientError(404);

		return project[0];
	})
	.then(project => {
		res.send(project);
	})
	.catch(next);

};

export function getProjects(req, res, next){

	const sort = sorter(req.query.sort, req.query.order === 'asc');

	co(function*(){
		let db = yield database();

		return yield findProjects(db, {});
	})
	.then(projects => {
		res.send(projects);
	})
	.catch(next);

};

const validatePostProjectsBody = ajv.compile({
	type: 'object',
	properties: {
		id: {
			type: 'string',
			minLength: 4,
			maxLength: 32,
			pattern: '^[a-z][0-9a-z_]{3,31}$',
		},
		name: {
			type: 'string',
			minLength: 1,
			maxLength: 64,
		},
	},
	required: ['id', 'name'],
});

export function postProjects(req, res, next){

	// Request check.
	if(!req.is('application/json'))
		throw newClientError(400, {'error': 'invalid_request'});

	// Body check.
	if(!validatePostProjectsBody(req.body))
		throw newClientError(400, {'error': 'invalid_request'});

	let project = req.body;
	project.creator_id = req.auth.id;
	project.created_at = new Date();
	project.updated_at = new Date();

	co(function*(){
		let db = yield database();

		const {result} = yield db.collection(PROJECTS)
			.insertOne(project);
		if(result.ok !== 1)
			throw newServerError(500);

		const inserted = yield findProjects(db, {
			id: project.id,
		});
		if(inserted.length === 0)
			throw newClientError(404);

		return inserted[0];
	})
	.then(pj => {
		res.send(pj);
	})
	.catch(next);

};

const validatePatchProjectsBody = ajv.compile({
	type: 'object',
	properties: {
		name: {
			type: 'string',
			minLength: 1,
			maxLength: 64,
		},
		phases: {
			type: 'array',
			items:[
				{
					type: 'object',
					properties: {
						name: {
							type: 'string',
							minLength: 1,
							maxLength: 32,
						},
					},
					required: ['name',],
				}
			],
			additionalItems: true,
		},
	},
});

export function patchProject(req, res, next){

	// Request check.
	if(!req.is('application/json'))
		throw newClientError(400, {'error': 'invalid_request'});

	// Body check.
	if(!validatePatchProjectsBody(req.body))
		throw newClientError(400, {'error': 'invalid_request'});

	const projectId = req.params.project_id;

	let project = {};
	project.updated_at = new Date();
	if(req.body.name)
		project.name = req.body.name;
	if(req.body.phases)
		project.phases = req.body.phases;

	co(function*(){
		let db = yield database();

		const found = yield db.collection(PROJECTS)
			.findOne({ id: projectId, });
		if(!found)
			throw newClientError(404);

		const {ok} = yield db.collection(PROJECTS)
			.findOneAndUpdate({ id: projectId, }, { $set: project, });
		if(ok !== 1)
			throw newServerError(500);

		const inserted = yield findProjects(db, {
			id: projectId,
		});
		if(inserted.length === 0)
			throw newClientError(404);

		return inserted[0];
	})
	.then(pj => {
		res.send(pj);
	})
	.catch(next);

};

async function findProjects(db, filter){

	return db.collection(PROJECTS)
		.aggregate([
			{
				$match: filter,
			},
			{
				$lookup: {
					from: 'users',
					let: {
						creator_id: '$creator_id',
					},
					pipeline: [
						{
							$match: {
								$expr: {
									$eq: ['$id', '$$creator_id'],
								},
							},
						},
						{
							$project: {
								_id: 0,
								password: 0,
								admin: 0,
							},
						},
					],
					as: 'creator',
				},
			},
			{
				$unwind: '$creator',
			},
			{
				$project: {
					_id: 0,
					creator_id: 0,
				},
			},
		])
		.toArray();
}

