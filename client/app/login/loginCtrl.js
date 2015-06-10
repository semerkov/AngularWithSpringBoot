var userModule = angular.module('app.loginModule');

userModule.controller('LoginCtrl', ['$scope', '$rootScope', '$location', '$cookieStore', 'LoginService',
                        function ($scope, $rootScope, $location, $cookieStore, LoginService) {
    $scope.rememberMe = false;
                            LoginService = new LoginService();

    $scope.login = function() {
        var user = {username: $scope.username, password: $scope.password};
        var promisse = LoginService.authenticate(user);
        promisse.then(function(authenticationResult) {
            var authToken = authenticationResult.token;
            $rootScope.authToken = authToken;
            if ($scope.rememberMe) {
                $cookieStore.put('authToken', authToken);
            }
            LoginService.get(function(user) {
                $rootScope.user = user;
                $location.path("/");
            });
        });
    };
}]);