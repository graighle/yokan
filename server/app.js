import config from 'config';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import cors from 'cors';
import api from './routes/api';
import { ResponseError } from './errors/ResponseError';

const app = express();

app.set('jwtSecretToken', config.jwtSecretToken);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('etag', false);

app.use(cors());
app.use('/api', api);

app.use((err, req, res, next) => {
	console.dir(err);
	if(res.headersSent)
		return next(err);

	if(err instanceof ResponseError){
		res.status(err.status || 500);
		res.set(err.headers || {});
		if(err.message)
			res.send(err.message);
		else
			res.end();
	}else if('status' in err){
		res.set(err.headers || {});
		res.sendStatus(err.status);
	}else{
		res.sendStatus(500);
	}
});

module.exports = app;

