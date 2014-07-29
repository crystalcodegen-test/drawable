Shortcut.Control.down = function($scope)
{
	$scope.drawable.arrangeObjects(
		$scope.drawable.selectedObjects,
		'top',
		$http,
		$scope.socket
	);
};