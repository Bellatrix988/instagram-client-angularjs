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
 