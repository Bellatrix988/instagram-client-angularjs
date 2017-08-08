var app = angular.module('instaApp',['insta_apiApp', 'routingApp']);
 var app = angular.module('insta_apiApp',['ngResource', 'ngSanitize']);
 angular.module('insta_apiApp')
 		.config(['$sceDelegateProvider','$qProvider', function($sceDelegateProvider, $qProvider) {
 			// $resourceProvider.defaults.stripTrailingSlashes = false;
 			$qProvider.errorOnUnhandledRejections(false);
 			$sceDelegateProvider.resourceUrlWhitelist([
		    'self',
		    'http://192.168.0.103:3000/**',
		    'https://bellatrix988.ru/**/*',
		    'https://bellatrix988.ru',
		    'https://bellatrix988.ru/content/instagram-client.html',
		    "https://www.instagram.com/**/*"
		  ]);
 		}])
 		.factory('InstagramService', ['$rootScope', '$location', '$http', '$window', function ($rootScope, $location, $http, $window) {
			    var client_id = "4a73bf00df514996b3ce157f0e804700";
 				var redirect_uri = "http://192.168.0.103:3000";//'https://bellatrix988.ru/content/instagram-client.html';//
			    var service = {
			        login: function () {
			            var igPopup = $window.open("https://instagram.com/oauth/authorize/?client_id=" + client_id +
			                "&redirect_uri=" + redirect_uri +
			                "&response_type=token", "_self");
			        }
			    };
			    return service;
 		}])
		// .controller("userData",['$scope', 'InstagramService', '$http', function($scope, InstagramService, $http){
		// 	$scope.test = function(){
		// 		InstagramService.login();
		// 		console.log('test');
		// 	}
		// 	//get info about user with current token
		// 	// var token = '3502197374.4a73bf0.9e1979277f0741bf9fff981605483cfa';
		// 	var token = $scope.token;
 	// 		var url = 'https://api.instagram.com/v1/users/self/?access_token='+token;
 	// 		$http.get(url).then(function(response){
 	// 			let dataPattern = response.data.data;
 	// 			$scope.data = {
 	// 				id: dataPattern.id,
 	// 				username : dataPattern.username,
 	// 				profilePic : dataPattern.profile_picture,
 	// 				countFollow : dataPattern.counts,
 	// 				fullname : dataPattern.full_name,
 	// 				biography : dataPattern.bio,
 	// 				website : dataPattern.website
 	// 			};
		// 	});
 	// 		$scope.content = Array(9).fill("./../../img/item.png");
		// }]);
var routingApp = angular.module('routingApp', ['ui.router']);
routingApp
    .config(function($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.otherwise('login');

    $stateProvider
        .state('login', {
            url: '',//'/access_token={access_token}',
            templateUrl: '../../../html-part/login.html',
            controller: 'userData'
        })

        .state('post',{
            url: '/posts',
            templateUrl: '../../../html-part/post.html'
        });
    })
    .controller("userData",['$scope', 'InstagramService', '$http', '$location', function($scope, InstagramService, $http, $location){
            $scope.token = '-1';

            $scope.login = function(){
                InstagramService.login();
                console.log('test');
            }
            //get info about user with current token
            var url = $location.absUrl();
            if(url.includes('access_token=')){
                var index = url.lastIndexOf('=');
                var token = url.substring(index+1);
                console.log('TOKEN = ', token);
                $scope.token = token;
            }
            // var token = '3502197374.4a73bf0.9e1979277f0741bf9fff981605483cfa';
            if($scope.token !== '-1'){
                var url = 'https://api.instagram.com/v1/users/self/?access_token='+$scope.token;
                $http.get(url).then(function(response){
                    $scope.data = response.data.data;//= getInfo(response);
                });

                var urlGetLastMedia = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + $scope.token;
                $http.get(urlGetLastMedia).then(function(response){
                    $scope.media = response.data.data;
                });
                $scope.content = Array(9).fill("./../../img/item.png");
            }

        }]);
