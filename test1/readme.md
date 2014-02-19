Notes
=====

## Resources ##

* [Hello World Tutorial](http://www.nodebeginner.org/#hello-world)
* [Node.js + Socket.io Tutorial](http://java.dzone.com/articles/getting-started-socketio-and)

## Steps ##

_Note_ `$ ` indicates a console command

0. Install `nodemon` for easier development -- wraps your app and autorestarts on changes
	0. @via https://github.com/remy/nodemon
	1. `$ npm install -g nodemon`
	2. run app with `$ nodemon` rather than `$ node`
	3. Monitor multiple directories: `$ nodemon -L --watch ~/workspace/mylib --watch libs app/server.js`
1. Create a "server" file (`server.js`) listening to port, http, etc
2. Build/Run (?) with `$ node ~/workspace/path-to-server.js`
3. Nitrous > Preview > choose listening port (ex *8888*)
