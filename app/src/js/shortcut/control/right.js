Shortcut.Control.right = function($scope)
{
	$scope.drawable.arrangeObjects(
		$scope.drawable.selectedObjects,
		'up',
		$http,
		$scope.socket
	);
};