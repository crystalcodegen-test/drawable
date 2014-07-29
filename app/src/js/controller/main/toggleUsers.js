Main.toggleUsers = function(hide)
{
	/* get scope */
	$scope = this;
	
	/* hide layers & windows */
	if (!hide) {
		$scope.toggleLayers(true);
	}
	$scope.toggleWindows(true);
	
	var users = $('#users');
	
	if ($scope.hideUsers === false || hide === true) {
		$scope.hideUsers = true;
		
		users.stop().animate({
			right : -users.outerWidth()
		},{
			duration : 500,
			complete : function()
			{
				users.hide();
			}
		});
		
	} else {
		$scope.hideUsers = false;
		users.css('right', -users.outerWidth());
		users.show();
		users.stop().animate({
			right : 0
		},{
			duration : 500
		});
	}
};