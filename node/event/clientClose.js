var event = {
	clientChange : require('./clientChange'),
	log : require('./log')
};

// handle when client closes connection
module.exports = function()
{
	console.log('clientClose event');
	
	// log logout
	event.log(this, { value : 'close' } );
	
	// handle client change
	event.clientChange();
};