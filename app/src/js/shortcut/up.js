Shortcut.up = function($scope)
{
	$scope.drawable.moveObjects(
		$scope.drawable.selectedObjects,
		'up',
		1,
		$scope.http,
		$scope.socket
	);
};