//handle client delete layer message
module.exports = function(ws, message)
{
	console.log('deleteLayer message: ' + JSON.stringify(message));
	
	for (var i in wss.clients) {
		if (wss.clients[i] == ws) {
			continue;
		}
		wss.clients[i].send(JSON.stringify({
			action : 'deleteLayer',
			status : 'success',
			data : message.data
		}));
	}
};