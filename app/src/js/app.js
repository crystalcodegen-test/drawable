/* App module */
function App()
{
	/* initialize module */
	_module = angular.module('draw', ['angularLocalStorage','ngDragDrop']);
	_module.config(['$httpProvider','$locationProvider', function($httpProvider, $locationProvider) {
		$httpProvider.defaults.headers.patch = {
			'Content-Type': 'application/json;charset=utf-8'
		};
		$locationProvider.html5Mode(true);
	}]);
	
	/* load controllers */
	_loadControllers = function() {
		_module.controller('LoginController', ['$scope', 'Auth', '$location', LoginController]);
		_module.controller('MainController', ['$scope', 'Auth', '$location', 'storage', MainController]);
	};
	
	/* load runs */
	_loadRuns = function() {
		return;
		_module.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
			$rootScope.$on('$routeChangeStart', function (event) {
				if (!Auth.isLoggedIn()) {
					$location.path('/home');
				}
			});
		}]);
	};
	
	/* load factories & services */
	_loadServices = function() {
		return;
		_module.factory('Auth', AuthService);
		_module.service('Session', SessionService);
	};
	
	/* initialize app */
	this.init = function() {
		/* load app when window loads */
		$(window).load(function() {
			_loadRuns();
			_loadControllers();
			_loadServices();		
		});
	};
};

/* initialize app */
var app = new App;
app.init();