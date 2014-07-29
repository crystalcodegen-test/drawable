// handle client login message
module.exports = function(ws, message)
{
	console.log('login message: ' + JSON.stringify(message));
	
	var error = function(e)
	{
		console.log('Error:');
		console.log(e);
		
		ws.send(JSON.stringify({
			action : 'login',
			status : 'error',
			error : typeof(e) == 'string' ? e : 'Unknown Error'
		}));
	};
	
	var options = {
		hostname : 'api.tate.ws',
		port : 80,
		path : '/v1/users/login',
		method : 'POST'
	};
	
	var req = http.request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			var json = JSON.parse(chunk);
			
			if (json.status == 'error') {
				error(json.data);
				return;
			}
			
			ws.data.cookie = res.headers['set-cookie'][0];
			ws.data.user = {
				id : json.data.id,
				username : json.data.username
			};
			
			ws.send(JSON.stringify({
				action : 'login',
				status : 'success'
			}));
			
			// handle client change
			handleClientChange();
		});
	});
	req.write(JSON.stringify({
		email : message.username,
		password : message.password
	}));
	req.on('error', error);
	
	req.end();
};