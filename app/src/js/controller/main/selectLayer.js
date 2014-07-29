Main.selectLayer = function(layer_id)
{
	/* get scope */
	$scope = this;
	
	/* select layer */
	$scope.drawable.currentLayer = layer_id;
};