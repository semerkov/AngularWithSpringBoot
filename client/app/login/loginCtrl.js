var userModule = angular.module('app.loginModule');

userModule.controller('LoginCtrl', ['$scope', '$rootScope', '$location', '$cookieStore', 'LoginService', function ($scope, $rootScope, $location, $cookieStore, LoginService) {

    $scope.rememberMe = true;

    $scope.login = function() {
        var user = {username: $scope.username, password: $scope.password};
        var promisse = LoginService.authenticate(user);
        promisse.then(function(authenticationResult) {
            var authToken = authenticationResult.token;
            $rootScope.authToken = authToken;
            if ($scope.rememberMe) {
                $cookieStore.put('authToken', authToken);
            }
            var promisseUser = LoginService.getLoggerUser();
            promisseUser.then(function(user) {
                $rootScope.loggedUser = user;
                $location.path("/");
            }, function(reason) {
                $scope.messages = [reason];
            });
        }, function(reason) {
            $scope.messages = ['Incorrect login/password entered. Please try again.'];
        });
    };
}]);