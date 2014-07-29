Main.toggleStrokes = function(hide)
{
	/* get scope */
	$scope = this;
	
	var strokes = $('#strokes');
	
	if ($scope.hideStrokes === false || hide === true) {
		$scope.hideStrokes = true;
		
		strokes.stop().animate({
			left : -strokes.outerWidth()
		},{
			duration : 500,
			complete : function()
			{
				strokes.hide();
			}
		});
		
	} else {
		$scope.hideStrokes = false;
		strokes.css('left', -strokes.outerWidth());
		strokes.show();
		strokes.stop().animate({
			left : 50
		},{
			duration : 500
		});
	}
};