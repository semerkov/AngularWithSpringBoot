var userModule = angular.module('app.usersModule');

userModule.controller('UsersListCtrl', ['$scope', 'usersModuleResource', function ($scope, usersModuleResource) {
    $scope.currentPage = 1;
    $scope.numPerPage = 10;
    $scope.maxSize = 5;

    $scope.loadPagesOfUser = function() {
        var parameters = {"$size": $scope.numPerPage, "$sort": "", "$page": $scope.currentPage - 1};
        var result = usersModuleResource.getUserList(parameters);
        $scope.users = result.content;

    };
    $scope.loadPagesOfUser();

    $scope.$watch("currentPage + numPerPage", function() {
        $scope.loadPagesOfUser();
    });
}]);