// declare some functions, etc
function make(Schema, mongoose) {
    // Define Car model
    CarSchema = new Schema({
      brand        : String,
      type : String
    });
    mongoose.model('Car', CarSchema);
}

// define library
var lib = {
	/**
	 * Check if undefined
	 */
	dne: function(p) {
		return typeof p === "undefined";
	}//--	fn	dne
	,
	log: function(p1, p2, p3) {
		if( lib.dne(p2) ) console.log(p1);
		else if ( lib.dne(p3) ) console.log(p1, p2);
		// could add the fancy `arguments` check for n params...
		else console.log(p1, p2, p3);
	}//--	fn	log
};//---	lib


//#region ----------- expose ------------
/*
	include these with:
	var util = require('../mylib/util.js');
	util.xxx(...);
	
	or			@via http://stackoverflow.com/a/9946809/1037948
	var fs = require('fs');
	var vm = require('vm');
	var includeInThisContext = function(path) {
		 var code = fs.readFileSync(path);
		 vm.runInThisContext(code, path);
	}.bind(this);
	includeInThisContext(__dirname + "/mylib/util.js");
*/

module.exports = lib;
//#endregion ----------- expose ------------
