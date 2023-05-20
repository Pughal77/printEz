const http = require('http');
const App = require('./app');

http.createServer(function (req, res) {
	// res stands for response
	// write a response to the client
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(App.ssh);
  	res.end(); // end the response
}).listen(8080); //the server object listens on port 8080