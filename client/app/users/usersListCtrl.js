var userModule = angular.module('app.usersModule');

userModule.controller('UsersListCtrl', ['$scope', 'UsersModuleResource', function ($scope, UsersModuleResource) {
    $scope.currentPage = 1;
    $scope.numPerPage = 10;
    $scope.maxSize = 5;
    $scope.totalElements = 0;

    usersModuleResource = new UsersModuleResource();

    $scope.loadPagesOfUser = function() {
        var parameters = {"$size": $scope.numPerPage, "$sort": "", "$page": $scope.currentPage - 1};
        var promisse = usersModuleResource.getUserList(parameters);
        promisse.then(function(result) {
            $scope.users = result.content;
            $scope.totalElements = result.totalElements;
        }, function(reason) {
            alert('Failed: ' + reason);
        });
    };

    $scope.$watch("currentPage + numPerPage", function() {
        $scope.loadPagesOfUser();
    });
}]);