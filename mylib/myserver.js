// dependencies
var http = require("http")
	, url = require("url")
	, util = require('./util.js')
	, _ = require('../lib/underscore-min.js')
;

// library
var lib = {
	/**
	 * What stops loops, borrowed from _underscore.js
	 */
	_breaker: {}
	,
	/**
	 * Started a server, with optional custom message
	 */
	began: function(port, msg) {
		util.log('Server started on port', port);
		if(!util.dne(msg)) util.log(msg);
	}//--	fn	began
	,
	methods: {
		/**
		 * Start the application server, providing an app callback
		 * to operate on the URL + response/request.
		 * Optionally specify a different port.
		 */
		start: function start(appFn, port) {
			var ME = this; // passthrough
			ME.port = port || lib.nitrousports._default;
			// rebind scope
			// TODO: fix because this sucks, even though it probably only runs once
			_.each(lib.methods.respond, function(fn, method) {
				ME.respond[method] = lib.methods.respond[method].bind(ME);
			});
			
			// start it up regularly
			http.createServer(function(request, response) {
				// save stuff we'll need to self
				ME.url = url.parse(request.url);
				ME.request = request;
				ME.response = response;
				
				util.log('Request received for url', ME.url);
				
				// start the app; save this fn just in case we want to call it again...?
				// provide response/request so we can shorthand them
				ME.begin = appFn.bind(ME); // bound to self
				ME.begin(ME.url, response, request); // call it
				
				response.end();
			}).listen(ME.port);
			
			lib.began(ME.port); // indicate that server has started
		}//--	fn	start
		,
		respond: {
			_ok: function(response, mime, code) {
				response.writeHead(code, {"Content-Type": mime});
			}//--	respond._ok
			,
			asPlain: function(code) {
				lib.methods.respond._ok(this.response, lib.mimetypes.plain, code || 200);
			}//--	fn	respond.asPlain
			,
			asHtml: function(code) {
				lib.methods.respond._ok(this.response, lib.mimetypes.httml, code || 200);
			}//--	fn	respond.asHtml
			,
			asJson: function(code) {
				lib.methods.respond._ok(this.response, lib.mimetypes.json, code || 200);
			}//--	fn	respond.asJson
			,
			asXml: function(code) {
				lib.methods.respond._ok(this.response, lib.mimetypes.xml, code || 200);
			}//--	fn	respond.asXml
		}//--	obj	respond
		,
		write: function(msg, tokens) {
			lib.write(this.response, false, msg, tokens);
		}//--	fn	write
		,
		writeInline: function(msg, tokens) {
			lib.write(this.response, true, msg, tokens);
		}//--	fn	writeInline
	}//--	obj	methods
	,
	write: function(response, isInline, msg, tokens) {
		// token replacement?
		if( !util.dne(tokens) ) {
			_.each(tokens, function (v, k) {
				msg = msg.replace(new RegExp('{{' + k + '}}', 'g'), v);
			});
		}
		// writeline
		response.write(msg);
		if(isInline !== true) response.write("\n");
	}//--	fn	write
	,
	mimetypes: {
		_default: "text/html"
		, plain: "text/plain"
		, html: "text/html"
		, json: "application/json"
		, xml: "application/text+xml"
	}//--	obj	mimetypes
	,
	nitrousports: {
		_default: 8888
		, public: 8080
		, private: 3000
	}//--	obj	nitrousports
};//---	lib

// create module class
var Server = function(appFn, port) {
	this.start(appFn, port);
}//--	class	Server

// attach prototype methods
for(var p in lib.methods) {
	if( lib.methods.hasOwnProperty(p) ) {
		Server.prototype[p] = lib.methods[p];
	}
}
// static/constants
Server.mimetypes = lib.mimetypes;
Server.nitrousports = lib.nitrousports;

//#region ----------- expose ------------
module.exports = Server;
//#endregion ----------- expose ------------
