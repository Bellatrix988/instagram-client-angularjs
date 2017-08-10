//module for routing pages
var routingApp = angular.module('routingApp', ['ui.router']);
routingApp
    .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('login', {
            url: '',
            templateUrl: '../../../html-part/login.html',
            controller: function($scope, InstagramService){
                $scope.login = function(){
                    InstagramService.login();
                    console.log('test');
                }
            }
        })
        //opening page with current media data 
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
 