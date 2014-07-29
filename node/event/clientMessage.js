var event = {
	chat : require('./chat'),
	deleteLayer : require('./deleteLayer'),
	drawObject : require('./drawObject'),
	eraseObject : require('./eraseObject'),
	log : require('./log'),
	login : require('./login'),
	updateObject : require('./updateObject')
};

// handle client message
module.exports = function(message)
{
	console.log('clientMessage event');
	
	// parse message as JSON object
	try {
		message = JSON.parse(message);
	// message is not JSON, exit
	} catch (e) {
		console.log('Unable to parse message');
		return;
	}
	
	// handle messages based on action
	switch (message.action) {
		// handle chat messages
		case 'chat' : {
			event.chat(this, message);
			break;
		}
		case 'deleteLayer' : {
			event.deleteLayer(this, message);
			break;
		}
		case 'drawObject' : {
			event.drawObject(this, message);
			break;
		}
		case 'eraseObject' : {
			event.eraseObject(this, message);
			break;
		}
		case 'updateObject' : {
			event.updateObject(this, message);
			break;
		}
		// handle log messages
		case 'log' : {
			event.log(this, message);
			break;
		}
		// handle login messages
		case 'login' : {
			event.login(this, message);
			break;
		}
	}
};