// notify admin of any client changes
module.exports = function()
{
	console.log('clientChange event');
	
	var admin,
		admins = new Array,
		client,
		clients = new Array;
		
	for (var i in wss.clients) {
		client = wss.clients[i];
		if (client.data.user.username == 'admin') {
			admins.push(client);
		} else {
			if (client.data.user.username) {
				clients.push({
					id : client.data.user.id,
					username : client.data.user.username
				});
			} else {
				clients.push({
					id : 0,
					username : 'Unknown'
				});
			}
		}
	}
	
	for (var i in admins) {
		admin = admins[i];
		admin.send(JSON.stringify({
			action : 'client',
			clients : clients
		}));
	}
};