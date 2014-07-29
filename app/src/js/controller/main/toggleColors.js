Main.toggleColors = function(hide)
{
	/* get scope */
	$scope = this;
	
	var colors = $('#colors');
	
	if ($scope.hideColors === false || hide === true) {
		$scope.hideColors = true;
		
		colors.stop().animate({
			left : -colors.outerWidth()
		},{
			duration : 500,
			complete : function()
			{
				colors.hide();
			}
		});
		
	} else {
		$scope.hideColors = false;
		colors.css('left', -colors.outerWidth());
		colors.show();
		colors.stop().animate({
			left : 50
		},{
			duration : 500
		});
	}
};