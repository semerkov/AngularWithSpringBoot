var userModule = angular.module('app.usersModule');

userModule.controller('UserRegistrationCtrl', ['$scope', '$routeParams', '$modal', 'UsersModuleResource', function ($scope, $routeParams, $modal, UsersModuleResource) {
    UsersModuleResource = new UsersModuleResource();
    var userid = $routeParams.userid;
    if (userid === undefined) {
        $scope.user = {};
    } else {
        var promisse = UsersModuleResource.getUser(userid);
        promisse.then(function(result) {
            $scope.user = result;
        }, function(reason) {
            addMessage(reason);
            $scope.success = false;
        });
    }
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

    function deleteUser() {
        var promisse = UsersModuleResource.deleteUser($scope.user.id);
        promisse.then(function(result) {
            addMessage(result.message);
            $scope.success = true;
            $scope.user = {};
        }, function(reason) {
            addMessage(reason);
            $scope.success = false;
        });
    }

    $scope.confirmDelete = function() {
        /*var dlg = $dialogs.confirm('Please Confirm','You really want to delete this user?');
        dlg.result.then(function(btn){
            deleteUser();
        });*/
    }

    function addMessage(message) {
        clearAllMessages();
        $scope.messages.push(message);
    }

    function clearAllMessages() {
        $scope.messages = [];
    }
}]);