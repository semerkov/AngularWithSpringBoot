var userModule = angular.module('app.usersModule');

userModule.controller('UserRegistrationCtrl', ['$scope', 'UsersModuleResource', function ($scope, UsersModuleResource) {
    //$scope.user = new Object();
    UsersModuleResource = new UsersModuleResource();

    $scope.save = function(user) {
        $scope.messages = [];
        $scope.success = true;
        if ($scope.form.$invalid) {
            alert("pray for the gods");
        }
        if (user.id == null) {
            var promisse = UsersModuleResource.saveUser(user);
            promisse.then(function(result) {
                addMessage(result.message);
                $scope.success = true;
                $scope.user = result.object;
            }, function(reason) {
                addMessage(reason);
                $scope.success = false;
            });
        } else {
            var promisse = UsersModuleResource.updateUser(user);
            // Pending implementation
        }

        function addMessage(message) {
            clearAllMessages();
            $scope.messages.push(message);
        }

        function clearAllMessages() {
            $scope.messages = [];
        }
    };
}]);