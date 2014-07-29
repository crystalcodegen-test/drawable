Shortcut.Shift.down = function($scope)
{
	$scope.drawable.moveObjects(
		$scope.drawable.selectedObjects,
		'down',
		10,
		$scope.http,
		$scope.socket
	);
};