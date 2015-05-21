var userModule = angular.module('app.usersModule');

userModule.controller('CadUserCtrl', function ($scope, $http, $q, $location, $timeout, $window, domain) {
    $scope.domain = domain + "wtv";
});