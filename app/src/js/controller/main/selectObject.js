Main.selectObject = function(object_id)
{
	/* get scope */
	$scope = this;
	
	if ($scope.drawable.selectedObjects.indexOf(object_id) === -1) {
		$scope.drawable.selectObject(object_id);
	} else {
		$scope.drawable.deselectObject(object_id);
	}
};