var app = require('../app');
var main = require('./main');
var page = require('./page');
app.use('/', main);
app.use('/pg', page);
