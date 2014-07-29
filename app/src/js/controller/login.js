function LoginController($scope, Auth, $location)
{
	$scope.credentials = {
		username : new String,
		password : new String
	};
	
	$scope.login = function(credentials)
	{
		console.log(credentials);
		
		$scope.formDisabled = true;
		
		Auth.login(credentials);
	};
};