'use strict';

var mainModel = angular.module('apiClient', ['ui.bootstrap', 'ngAnimate', 'UserswebapiModule', 'ngRoute']);

mainModel.run(function ($http) {

	// Adds HTTP basic authentication to all your calls to the API
    var encoded = btoa('<username>:<password>');
    $http.defaults.headers.common.Authorization = 'Basic ' + encoded;

});

mainModel.controller('MainCtrl', function ($scope, $http, $q, $location, $timeout, $window, UserswebapiClientResource) {

	$scope.uri = 'http://localhost:8080/';
	var userswebapiClientResource = new UserswebapiClientResource($scope.uri);
	
	// Do some magic !
	
});

mainModel.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'app/home.html',
            controller  : 'MainCtrl'
        })

        // route for the about page
        .when('/user', {
            templateUrl : 'users/view/cad_user.html',
            controller  : 'CadUserCtrl'
        });
});