Shortcut.delete = function($scope)
{
	if ($scope.drawable.selectedObjects.length) {
		$scope.deleteSelectedObjects();
	} else {
		$scope.deleteSelectedLayer();
	}
};