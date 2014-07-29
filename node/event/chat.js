// handle client chat message
module.exports = function(ws, message)
{
	console.log('chat message: ' + JSON.stringify(message));
	
	if (!ws.data.user.id) {
		ws.send(JSON.stringify({
			action : 'chat',
			status : 'error',
			error : 'Unauthorized message.'
		}));
		return;
	}
	
	var user_id;
	if (ws.data.user.id != 1 || !message.user) {
		user_id = 1;
	} else {
		user_id = message.user;
	}
	
	var client, message_sent = false;
	for (var i in wss.clients) {
		client = wss.clients[i];
		if (client.data.user.id == user_id) {
			message_sent = true;
			
			client.send(JSON.stringify({
				action : 'chat',
				status : 'success',
				user_from : ws.data.user.id,
				value : message.value
			}));
		}
	}
	
	if (!message_sent) {
		ws.send(JSON.stringify({
			action : 'chat',
			status : 'error',
			error : 'User is offline and will not read this until they are back online.'
		}));
	}
	
	var error = function(e)
	{
		console.log('Error:');
		console.log(e);
		
		ws.send(JSON.stringify({
			action : 'chat',
			status : 'error',
			error : typeof(e) == 'string' ? e : 'Unknown Error'
		}));
	};
	
	if (ws.data.user.username != 'admin') {
		var options = {
			headers : {
				'Cookie' : ws.data.cookie.split(';')[0]
			},
			hostname : 'api.tate.ws',
			port : 80,
			path : '/v1/users/push',
			method : 'POST'
		};
		
		var req = http.request(options);
		req.on('error', error);
		req.write(JSON.stringify({
			message : ws.data.user.username + ': ' + message.value
		}));
		
		req.end();
	}
	
	var options = {
		headers : {
			'Cookie' : ws.data.cookie.split(';')[0]
		},
		hostname : 'api.tate.ws',
		port : 80,
		path : '/v1/messages/add',
		method : 'POST'
	};
	
	var req = http.request(options);
	req.on('error', error);
	req.write(JSON.stringify({
		content : message.value,
		user_from : ws.data.user.id,
		user_to : ws.data.user.id == 1 && message.user ? message.user : 1
	}));
	
	req.end();
};