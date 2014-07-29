Shortcut.right = function($scope)
{
	$scope.drawable.moveObjects(
		$scope.drawable.selectedObjects,
		'right',
		1,
		$scope.http,
		$scope.socket
	);
};