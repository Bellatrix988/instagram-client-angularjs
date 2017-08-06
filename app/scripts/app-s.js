var app = angular.module('instaApp',['insta_apiApp', 'routingApp']);
 var app = angular.module('insta_apiApp',['ngResource', 'ngSanitize']);
 angular.module('insta_apiApp')
 		.config(['$sceDelegateProvider','$qProvider', function($sceDelegateProvider, $qProvider) {
 			// $resourceProvider.defaults.stripTrailingSlashes = false;
 			$qProvider.errorOnUnhandledRejections(false);
 			$sceDelegateProvider.resourceUrlWhitelist([
		    'self',
		    'http://192.168.0.103:3000/**',
		    'http://192.168.0.103:3000',
		    'https://bellatrix988.ru/**/*',
		    'https://bellatrix988.ru',
		    'https://bellatrix988.ru/content/instagram-client.html',
		    "https://www.instagram.com/**/*"
		  ]);
 		}])
 		.factory('InstagramService', ['$rootScope', '$location', '$http', function ($rootScope, $location, $http) {
			    var client_id = "4a73bf00df514996b3ce157f0e804700";
 				var redirect_uri = "http://192.168.0.103:3000";//'https://bellatrix988.ru/content/instagram-client.html';//
			    var service = {
			        login: function () {
			            var igPopup = window.open("https://instagram.com/oauth/authorize/?client_id=" + client_id +
			                "&redirect_uri=" + redirect_uri +
			                "&response_type=token", "igPopup");
			        }
			    };
			    return service;
 		}])
 		.factory('auth', ['$sce', '$http', function($sce, $http){
 			var redirect_uri = "http://192.168.0.103:3000";//'https://bellatrix988.ru/content/instagram-client.html';//
		    var client_id = "4a73bf00df514996b3ce157f0e804700";//"0bbbd75fb94f4fcdaacd4d540d4f0577";//
		    redirect_uri = $sce.trustAsResourceUrl(redirect_uri);
		    var endpoint = 'https://api.instagram.com/oauth/authorize/?client_id='+client_id+'&redirect_uri='+redirect_uri+'&response_type=token';
		    return $http.get(endpoint)
				    .then(function(response) {
				        var data = response.data;
				        console.log(data);
				        return data;
    				});
 		}])
		.controller("userData",['$scope', 'InstagramService', '$http', function($scope, InstagramService, $http){
			$scope.test = function(){
				InstagramService.login();
				console.log('test');
			}
			//get info about user with current token
			var token = '3502197374.4a73bf0.9e1979277f0741bf9fff981605483cfa';
 			var url = 'https://api.instagram.com/v1/users/self/?access_token='+token;
 			$http.get(url).then(function(response){
 				let dataPattern = response.data.data;
 				$scope.data = {
 					id: dataPattern.id,
 					username : dataPattern.username,
 					profilePic : dataPattern.profile_picture,
 					countFollow : dataPattern.counts,
 					fullname : dataPattern.full_name,
 					biography : dataPattern.bio,
 					website : dataPattern.website
 				};
			});
 			$scope.content = Array(9).fill("./../../img/item.png");
		}]);
var routingApp = angular.module('routingApp', ['ui.router']);
routingApp
    .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('login');

    $stateProvider
        .state('login', {
            url: '/access_token={access_token}',
            templateUrl: '../../../html-part/login.html',
            controller: 'OAuthLoginController'
        })

        .state('profile', {
            url: '/profile',
            templateUrl: '../../../html-part/profile.html'
        })

        .state('post',{
            url: '/posts',
            templateUrl: '../../../html-part/post.html'
        });
    })
    .controller("OAuthLoginController", function ($scope, $stateParams, $window, $state) {
        var $parentScope = $window.opener.angular.element(window.opener.document).scope();
        if (angular.isDefined($stateParams.access_token)) {
            $parentScope.$broadcast("igAccessTokenObtained", { access_token: $stateParams.access_token })
        }
        $window.close();
    });