Shortcut.down = function($scope)
{
	$scope.drawable.moveObjects(
		$scope.drawable.selectedObjects,
		'down',
		1,
		$scope.http,
		$scope.socket
	);
};