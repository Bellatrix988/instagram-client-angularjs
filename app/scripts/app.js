 angular.module('instaApp',[])
 		.factory('baseDate',function(){
 			return {
 				getProfile = function(){

 				}
 			};
 		})
 		.controller('dataCtrl',['$scope', 'baseDate'], function($scope, baseDate){
 			$scope.username = "";
 			$scope.content = [1..9];
		});		