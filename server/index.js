var http = require('http');
var config = require('config');
var createRouter = require('./router');

var router = createRouter();
var server = http.createServer(router.createHandler());

server.listen(config.get('port'));