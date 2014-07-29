var event = {
	clientClose : require('./clientClose'),
	clientMessage : require('./clientMessage')
};

// handle when client connects to sockets
module.exports = function(ws)
{
	console.log('clientConnection event');
	
	// collect data for client
	ws.data = {
		start : new Date,
		user : {}
	};
	
	// handle when closed
	ws.on('close', event.clientClose);
	
	// handle messages from back.php
	ws.on('message', event.clientMessage);
};