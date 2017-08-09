var app = angular.module('instaApp',['insta_apiApp', 'routingApp']);
 var app = angular.module('insta_apiApp',['ngDialog']);
 angular.module('insta_apiApp')
 		.config(['$sceDelegateProvider','$qProvider', function($sceDelegateProvider, $qProvider) {
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
 		.service('ApiData', ['$http', function($http){
 			this.getData = function(url){
	                return $http.get(url);
 			};
 		}])
 		.factory('InstagramService', ['$window', function ( $window) {
			    var client_id = "4a73bf00df514996b3ce157f0e804700";
 				var redirect_uri = "http://192.168.0.103:3000";//'https://bellatrix988.ru/content/instagram-client.html';//
			    var service = {
			        login: function () {
			            $window.open("https://instagram.com/oauth/authorize/?client_id=" + client_id +
			                "&redirect_uri=" + redirect_uri +
			                "&response_type=token", "_self");
			        }
			    };
			    return service;
 		}])
	    .controller("userData",['$scope', 'ApiData', 'ngDialog', '$location', function($scope, ApiData, ngDialog, $location){
            $scope.clickToOpen = function (token,id) {
            	$scope.getMedia(token, id);
		        ngDialog.open({
		         template: '../../html-part/post.html', 
		         className: 'ngdialog-theme-default' 
		     });
		    };

            getData = function(url){
            	return ApiData.getData(url);
            }
            $scope.token = '-1';
            $scope.media_id = '-1';
            //get info about user with current token
            var url = $location.absUrl();
            if(url.includes('token=')){
                var index = url.lastIndexOf('n=');
                var indEnd = url.lastIndexOf('&id');
                var token = url.substring(index+2,51 + index + 2);
                console.log('TOKEN = ', token);
                $scope.token = token;
            }
            if(url.includes('id')){
                var index = url.lastIndexOf('=');
                var media_id = url.substring(index+1);
                console.log('media_id = ', media_id);
                $scope.media_id = media_id;
            }
            if($scope.token !== '-1'){
 				var url = 'https://api.instagram.com/v1/users/self/?access_token='+ $scope.token;
                var urlMediaInfo = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + $scope.token;

                getData(url).then(function(response){
					$scope.data = response.data.data;
	            });
	            getData(urlMediaInfo).then(function(response){
	            	$scope.medias = response.data.data;
	            });
            }

            $scope.getMedia = function(token, id){
                var urlMediaInfo = 'https://api.instagram.com/v1/media/'+id+'?access_token=' + token;
                var urlMediaComments = 'https://api.instagram.com/v1/media/'+ id +'/comments?access_token='+ token;
                
                getData(urlMediaInfo).then(function(response){
                    $scope.media = response.data.data;
                });
                getData(urlMediaComments).then(function(response){
                    $scope.comments = response.data.data;
                });
            }
        }]);

var routingApp = angular.module('routingApp', ['ui.router']);
routingApp
    .config(function($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.otherwise('login');

    $stateProvider
        .state('login', {
            url: '',//'/access_token={access_token}',
            templateUrl: '../../../html-part/login.html',
            controller: function($scope, InstagramService){
                $scope.login = function(){
                    InstagramService.login();
                    console.log('test');
                }
            }
        })

        .state('post',{
            url: '/post?token&id',
            templateUrl: '../../../html-part/post.html',
            params:{
                token: null,
                id: null
            },
            controller: function($scope, $stateParams){
                $scope.token = $stateParams.token;
                $scope.id = $stateParams.id;
            }
        });
    })
 