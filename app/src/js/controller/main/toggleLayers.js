Main.toggleLayers = function(hide)
{
	/* get scope */
	$scope = this;
	
	/* hide users & windows */
	if (!hide) {
		$scope.toggleUsers(true);
	}
	$scope.toggleWindows(true);
	
	var layers = $('#layers');
	
	if ($scope.hideLayers === false || hide === true) {
		$scope.hideLayers = true;
		
		layers.stop().animate({
			right : -layers.outerWidth()
		},{
			duration : 500,
			complete : function()
			{
				layers.hide();
			}
		});
		
	} else {
		$scope.hideLayers = false;
		layers.css('right', -layers.outerWidth());
		layers.show();
		layers.stop().animate({
			right : 0
		},{
			duration : 500
		});
	}
};