//handle client erase object message
module.exports = function(ws, message)
{
	console.log('eraseObject message: ' + JSON.stringify(message));
	
	for (var i in wss.clients) {
		if (wss.clients[i] == ws) {
			continue;
		}
		wss.clients[i].send(JSON.stringify({
			action : 'eraseObject',
			status : 'success',
			data : message.data
		}));
	}
};