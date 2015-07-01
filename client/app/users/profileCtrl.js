var userModule = angular.module('app.usersModule');

userModule.controller('ProfileCtrl', ['$scope', 'UsersModuleResource', function ($scope, UsersModuleResource) {
    //$scope.user =
    $scope.messages = [];
    $scope.success = true;

    $scope.save = function(user) {
        if ($scope.form.$invalid) {
            clearAndAddMessage("Check the errors in the form", false);
            return;
        }
        if (validateUser(user) === false) {
            return;
        }

        var promisse = null;
        if (user.id == null) {
            promisse = UsersModuleResource.saveUser(user);
        } else {
            promisse = UsersModuleResource.updateUser(user);
        }
        promisse.then(function(result) {
            clearAndAddMessage(result.message, true);
            $scope.user = result.object;
        }, function(reason) {
            clearAndAddMessage(reason.body.message, false);
        });

    };

    function clearAndAddMessage(message, success) {
        clearAllMessages();
        addMessage(message, success);
    }

    function addMessage(message, success) {
        $scope.messages.push(message);
        $scope.success = success;
    }

    function clearAllMessages() {
        $scope.messages = [];
    }

    $scope.$on('flow::fileAdded', function (event, $flow, flowFile) {
        event.preventDefault();//prevent file from uploading
    });

}]);