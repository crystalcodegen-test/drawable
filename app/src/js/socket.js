var Socket = function(opts)
{
	this.connection;
	this.url = '10.0.1.3:12345';
	
	this.close = function()
	{
		if (opts.close) {
			opts.close();
		}
	};
	
	this.error = function(data)
	{
		if (opts.error) {
			opts.error();
		}
	};
	
	this.init = function(opts)
	{
		this.connection = new WebSocket('ws://' + this.url);
		this.connection.onclose = this.close;
		this.connection.onerror = this.error;
		this.connection.onmessage = this.message;
		this.connection.onopen = this.open;
	};
	
	this.message = function(message)
	{
		var message = JSON.parse(message.data);
		
		if (opts.message) {
			opts.message(message);
		}
	};
	
	this.open = function()
	{
		if (opts.open) {
			opts.open();
		}
	};
	
	this.send = function(message)
	{
		this.connection.send(
			JSON.stringify(message)
		);
	};
};