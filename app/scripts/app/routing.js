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
