Shortcut.left = function($scope)
{
	$scope.drawable.moveObjects(
		$scope.drawable.selectedObjects,
		'left',
		1,
		$scope.http,
		$scope.socket
	);
};