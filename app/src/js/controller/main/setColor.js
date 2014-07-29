Main.setColor = function(color)
{
	/* get scope */
	$scope = this;
	
	$scope.selectedColor = color;
	$scope.toggleColors(true);
	
	$scope.drawable.setColor(color);
};