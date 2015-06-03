var userModule = angular.module('app.usersModule');

userModule.controller('UserRegistrationCtrl', ['$scope', 'UsersModuleResource', function ($scope, UsersModuleResource) {
    UsersModuleResource = new UsersModuleResource();
    $scope.user = {};
    $scope.messages = [];
    $scope.success = true;

    $scope.save = function(user) {
        if ($scope.form.$invalid) {
            addMessage("Check the errors in the form")
        }
        var promisse = null;
        if (user.id == null) {
            promisse = UsersModuleResource.saveUser(user);
        } else {
            promisse = UsersModuleResource.updateUser(user);
        }
        promisse.then(function(result) {
            addMessage(result.message);
            $scope.success = true;
            $scope.user = result.object;
        }, function(reason) {
            addMessage(reason);
            $scope.success = false;
        });

    };

    function addMessage(message) {
        clearAllMessages();
        $scope.messages.push(message);
    }

    function clearAllMessages() {
        $scope.messages = [];
    }
}]);