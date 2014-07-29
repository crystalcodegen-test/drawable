Main.toggleObject = function(object_id)
{
	/* get scope */
	$scope = this;
	
	if ($scope.objectsExpanded[object_id]) {
		delete($scope.objectsExpanded[object_id]);
	} else {
		$scope.objectsExpanded[object_id] = true;
	}
	console.log($scope.objectsExpanded);
};