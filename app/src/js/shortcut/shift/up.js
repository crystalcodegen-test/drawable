Shortcut.Shift.up = function($scope)
{
	$scope.drawable.moveObjects(
		$scope.drawable.selectedObjects,
		'up',
		10,
		$scope.http,
		$scope.socket
	);
};