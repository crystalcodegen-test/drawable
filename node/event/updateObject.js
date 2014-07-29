//handle client draw object message
module.exports = function(ws, message)
{
	console.log('updateObject message: ' + JSON.stringify(message));
	
	for (var i in wss.clients) {
		if (wss.clients[i] == ws) {
			continue;
		}
		wss.clients[i].send(JSON.stringify({
			action : 'updateObject',
			status : 'success',
			data : message.data
		}));
	}
};