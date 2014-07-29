Shortcut.Control.left = function($scope)
{
	$scope.drawable.arrangeObjects(
		$scope.drawable.selectedObjects,
		'down',
		$http,
		$scope.socket
	);
};