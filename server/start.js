require('@babel/register')({
});
var app = require('./app.js');

process.on('unhandledRejection', console.dir);

module.exports = app;

