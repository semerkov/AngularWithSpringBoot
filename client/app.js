'use strict';

angular.module('apiClient', ['ui.bootstrap', 'ngAnimate', 'UserswebapiModule'])

.run(function ($http) {

	// Adds HTTP basic authentication to all your calls to the API
    var encoded = btoa('<username>:<password>');
    $http.defaults.headers.common.Authorization = 'Basic ' + encoded;

})

.controller('MainCtrl', function ($scope, $http, $q, $location, $timeout, $window, UserswebapiClientResource) {

	$scope.uri = 'http://localhost:8080/';
	var userswebapiClientResource = new UserswebapiClientResource($scope.uri);
	
	// Do some magic !
	
});