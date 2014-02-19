var http = require("http")
	, util = require('../mylib/util.js');

http.createServer(function(request, response) {
	util.log('Request received');
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello World 5");
	response.end();
}).listen(8888);

util.log('Server started');