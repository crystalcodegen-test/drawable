Shortcut.Shift.left = function($scope)
{
	$scope.drawable.moveObjects(
		$scope.drawable.selectedObjects,
		'left',
		10,
		$scope.http,
		$scope.socket
	);
};