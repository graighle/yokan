import express from 'express';
import path from 'path';
import logger from 'morgan';
import cors from 'cors';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('etag', false);

app.use(cors());

app.use((err, req, res, next) => {
	console.dir(err);
	if(res.headersSent)
		return next(err);

	if('status' in err){
		res.set(err.headers || {});
		res.sendStatus(err.status);
	}else{
		res.sendStatus(500);
	}
});

module.exports = app;


