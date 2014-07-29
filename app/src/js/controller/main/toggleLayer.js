Main.toggleLayer = function(layer_id)
{
	/* get scope */
	$scope = this;
	
	if ($scope.layersExpanded[layer_id]) {
		delete($scope.layersExpanded[layer_id]);
	} else {
		$scope.layersExpanded[layer_id] = true;
	}
};