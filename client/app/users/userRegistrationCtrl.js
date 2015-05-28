var userModule = angular.module('app.usersModule');

userModule.controller('UserRegistrationCtrl', function ($scope, $http, $q, $location, $timeout, $window, domain) {
    $scope.domain = domain + "wtv";
});