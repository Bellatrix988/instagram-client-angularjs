 var app = angular.module('instaApp',['ngResource', 'ngSanitize']);
 angular.module('instaApp')
 		.config(['$sceDelegateProvider','$qProvider', function($sceDelegateProvider, $qProvider) {
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
 		.factory('userData', ['$resource', '$sce', function($resource, $sce){
 			var redirect_uri = "http://192.168.0.103:3000";//'https://bellatrix988.ru/content/instagram-client.html';//
		    var client_id = "4a73bf00df514996b3ce157f0e804700";//"0bbbd75fb94f4fcdaacd4d540d4f0577";//
		    redirect_uri = $sce.trustAsResourceUrl(redirect_uri);
		    var endpoint = 'https://api.instagram.com/oauth/authorize/?client_id='+client_id+'&redirect_uri='+redirect_uri+'&response_type=token';
		    return $resource(endpoint, {}, {
		      query: {method:'JSONP'}
		    });
 		}])
 		.controller("dataCtrl",['$scope', 'userData', function($scope, userData){
 			$scope.username = "Caroine";
 			$scope.auth = function(){
 				userData.query();
 				// alert(userData);

 			}
 			// console.log($scope.photos);
 			$scope.content = Array(9).fill("./../../img/item.png");
		}]);