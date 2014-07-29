Shortcut.Shift.right = function($scope)
{
	$scope.drawable.moveObjects(
		$scope.drawable.selectedObjects,
		'right',
		10,
		$scope.http,
		$scope.socket
	);
};