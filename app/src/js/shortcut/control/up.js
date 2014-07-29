Shortcut.Control.up = function($scope)
{
	$scope.drawable.arrangeObjects(
		$scope.drawable.selectedObjects,
		'bottom',
		$http,
		$scope.socket
	);
};