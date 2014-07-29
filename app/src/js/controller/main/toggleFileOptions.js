Main.toggleFileOptions = function(hide)
{
	/* get scope */
	$scope = this;
	
	var file = $('#file');
	
	if ($scope.hideFileOptions === false || hide === true) {
		$scope.hideFileOptions = true;
		
		file.stop().animate({
			left : -file.outerWidth()
		},{
			duration : 500,
			complete : function()
			{
				file.hide();
			}
		});
		
	} else {
		$scope.hideFileOptions = false;
		file.css('left', -file.outerWidth());
		file.show();
		file.stop().animate({
			left : 50
		},{
			duration : 500
		});
	}
};