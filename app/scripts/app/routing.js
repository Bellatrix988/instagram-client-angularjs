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