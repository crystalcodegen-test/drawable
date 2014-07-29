Main.toggleTools = function(hide)
{
	/* get scope */
	$scope = this;
	
	var tools_nav = $('#tools-nav');
	
	if ($scope.hideTools === false || hide === true) {
		$scope.hideTools = true;
		
		tools_nav.stop().animate({
			left : -tools_nav.outerWidth()
		},{
			duration : 500,
			complete : function()
			{
				tools_nav.hide();
			}
		});
		
	} else {
		$scope.hideTools = false;
		tools_nav.css('left', -tools_nav.outerWidth());
		tools_nav.show();
		tools_nav.stop().animate({
			left : 50
		},{
			duration : 500
		});
	}
};