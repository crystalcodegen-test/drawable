function AuthService($http, Session)
{
	var auth = {};
	
	auth.login = function(credentials) {
		return $http
			.post('http://127.0.0.1:9292/login', credentials)
			.then(function (res) {
				Session.create(res.id, res.user.id);
				return res.user;
			});
	};
	
	auth.isLoggedIn = function() {
		return !!Session.userId;
	};
	
	return auth;
};