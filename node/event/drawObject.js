//handle client draw object message
module.exports = function(ws, message)
{
	console.log('drawObject message: ' + JSON.stringify(message));
	
	for (var i in wss.clients) {
		if (wss.clients[i] == ws) {
			continue;
		}
		wss.clients[i].send(JSON.stringify({
			action : 'drawObject',
			status : 'success',
			data : message.data
		}));
	}
};