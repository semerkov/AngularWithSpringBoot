'use strict';

var mainModel = angular.module('app', ['ui.bootstrap', 'ngAnimate', 'ngRoute',
                                        'app.usersModule']);

mainModel.run(function ($http) {

	// Adds HTTP basic authentication to all your calls to the API
    var encoded = btoa('<username>:<password>');
    $http.defaults.headers.common.Authorization = 'Basic ' + encoded;

});

mainModel.controller('MainCtrl', function ($scope, $http, $q, $location, $timeout, $window, domain) {
    $scope.url = domain;
	
});

mainModel.constant('domain','http://localhost:8080/');

mainModel.config(function($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl : 'app/home.html',
            controller  : 'MainCtrl'
        })

        .when('/user', {
            templateUrl : 'app/users/view/cad_user.html',
            controller  : 'CadUserCtrl'
        });
});