var userModule = angular.module('app.usersModule');

userModule.controller('UserRegistrationCtrl', ['$scope', 'UsersModuleResource', function ($scope, UsersModuleResource) {
    //$scope.user = new Object();
    UsersModuleResource = new UsersModuleResource();

    $scope.save = function(user) {
        if ($scope.form.$invalid) {
            alert("pray for the gods");
        }
        if (user.id == null) {
            var promisse = UsersModuleResource.saveUser(user);
            promisse.then(function(result) {
                $scope.users = result.content;
                $scope.totalElements = result.totalElements;
            }, function(reason) {
                alert('Failed: ' + '');
            });
        } else {
            UsersModuleResource.updateUser(user);
        }
    };
}]);