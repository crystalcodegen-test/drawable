// import packages
var event = require('./event'),
	http = require('http'),
	server = require('ws').Server;

// set global vars
GLOBAL.wss;

var init = function()
{
	console.log('init');
	
	var port = process.env.PORT || 12345;
	
	// create ws server on port 12345
	wss = new server({
		port : port
	});
	
	// handle connections from front.htm & back.php
	wss.on('connection', event.clientConnection);
};

init();