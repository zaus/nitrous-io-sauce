// BEGIN: nodemon --watch ~/workspace/mylib ~/workspace/test1/index.js

//#region -------------- modules -----------------

var //http = require("http"),
	util = require('../mylib/util.js')
	, Server = require('../mylib/myserver.js')
;

//#endregion -------------- modules -----------------

var server = new Server(function(url, res) {
	this.respond.asPlain(); // output type
	

	this.write("Hello World index.js"); // alias to response.write
	this.write("what are you looking at?");
	this.write("now what? Template {{a}} becomes {{b}}", {a: "first", b: new Date().toString()});
	this.write('we iz on port ' + this.port);
	this.write('current url:' + JSON.stringify(url));
	this.write('current url (from this):' + JSON.stringify(this.url));
});