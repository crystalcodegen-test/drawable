Main.toggleWindows = function(hide)
{
	/* get scope */
	$scope = this;
	
	var windows = $('#windows');
	
	if ($scope.hideWindows === false || hide === true) {
		$scope.hideWindows = true;
		
		windows.stop().animate({
			left : -windows.outerWidth()
		},{
			duration : 500,
			complete : function()
			{
				windows.hide();
			}
		});		
		
	} else {
		$scope.hideWindows = false;
		windows.css('left', -windows.outerWidth());
		windows.show();
		windows.stop().animate({
			left : 50
		},{
			duration : 500
		});
	}
};