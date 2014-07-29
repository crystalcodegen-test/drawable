var http = require('http');

//handle client log message
module.exports = function(ws, message)
{
	console.log('log message: ' + JSON.stringify(message));
	
	var error = function(e)
	{
		console.log('Error:');
		console.log(e);
		
		ws.send(JSON.stringify({
			action : 'log',
			status : 'error',
			error : typeof(e) == 'string' ? e : 'Unknown Error'
		}));
	};
	
	var options = {
		hostname : 'api.tate.ws',
		port : 80,
		path : '/v1/users/log',
		method : 'POST'
	};
	
	var req = http.request(options);
	req.write(JSON.stringify({
		user : ws.data.user.id,
		value : message.value
	}));
	req.on('error', error);
	
	req.end();
};