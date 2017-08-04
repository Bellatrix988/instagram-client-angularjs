 var app = angular.module('instaApp',[]);
 angular.module('instaApp')
 		.factory('baseDate',function(){
 			return {
		
 			};
 		})
 		.controller("dataCtrl",['$scope', 'baseDate', function($scope, baseDate){
 			$scope.username = "Caroine";
 			$scope.content = Array(9).fill("./../../img/item.png");
		}]);