function SessionService()
{
	this.create = function(sessionID, userID) {
		this.id = sessionID;
		this.userID = userID;
	};
	
	this.destroy = function() {
		this.id = null;
		this.userID = null;
	};
	
	return this;
};