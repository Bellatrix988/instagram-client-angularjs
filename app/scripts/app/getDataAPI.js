 var app = angular.module('insta_apiApp',[]);
 //module for processing data from API
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
        //service for getting data from url
 		.service('ApiData', ['$http', function($http){
 			this.getData = function(url){
	                return $http.get(url);
 			};
            this.jsonData = function(url){
                return $http.jsonp(url);
            }
 		}])
        //factory for Authentication user
 		.factory('InstagramService', ['$window', function ( $window) {
			    var client_id = "4a73bf00df514996b3ce157f0e804700";
 				var redirect_uri = "http://192.168.0.103:3000";//'https://bellatrix988.ru/content/instagram-client.html';//
                var service = {
                    //redirects user on page-Authentication
			        login: function () {
			            $window.open("https://instagram.com/oauth/authorize/?client_id=" + client_id +
			                "&redirect_uri=" + redirect_uri +
			                "&response_type=token", "_self");
			        }
			    };
			    return service;
 		}])
	    .controller("userData",['$scope', 'ApiData', '$location', function($scope, ApiData, $location){
            //function from service
            getData = function(url){
            	return ApiData.getData(url);
            }
            $scope.token = '-1'; //'3502197374.4a73bf0.9e1979277f0741bf9fff981605483cfa'; //'-1';
            $scope.media_id = '-1';

            //region get info about user with current token and id
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
            //endregion

            if($scope.token !== '-1'){
 				var url = 'https://api.instagram.com/v1/users/self/?access_token='+ $scope.token;
                var urlMediaInfo = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + $scope.token;
                //get data about user
                getData(url).then(function(response){
					$scope.data = response.data.data;
	            });
                //get last loaded media data
	            getData(urlMediaInfo).then(function(response){
	            	$scope.medias = response.data.data;
	            });
            }

            //get info and comments about media data with current id
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
