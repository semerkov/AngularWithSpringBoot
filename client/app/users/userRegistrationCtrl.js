var userModule = angular.module('app.usersModule');

userModule.controller('UserRegistrationCtrl', ['$scope', '$routeParams', '$modal', 'UsersModuleResource', function ($scope, $routeParams, $modal, UsersModuleResource) {
    var userid = $routeParams.userid;
    if (userid === undefined) {
        $scope.user = {};
    } else {
        var promisse = UsersModuleResource.getUser(userid);
        promisse.then(function(result) {
            $scope.user = result;
        }, function(reason) {
            clearAndAddMessage(reason, false);
        });
    }
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

    $scope.deleteUser = function() {
        var promisse = UsersModuleResource.deleteUser($scope.user.id);
        promisse.then(function(result) {
            clearAndAddMessage(result.message, true);
            $scope.user = {};
        }, function(reason) {
            clearAndAddMessage(reason, false);
        });
    }

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

    function validateUser(user) {
        clearAllMessages();
        var valid = true;
        if (user.id == null) {
            if (user.password != user.passwordConfirmation) {
                addMessage("The password and confirmation are different", false);
                valid = false;
            }
        }
        return valid;
    }
}]);