var userModule = angular.module('app.usersModule');

userModule.controller('UsersListCtrl', function ($scope) {
    $scope.filtered = [];
    $scope.currentPage = 1;
    $scope.numPerPage = 10;
    $scope.maxSize = 5;

    $scope.makeUsers = function() {
        $scope.users = [];
        for (i=1;i<=1000;i++) {
            $scope.users.push({ number:"user "+i, done:false});
        }
    };
    $scope.makeUsers();

    $scope.$watch("currentPage + numPerPage", function() {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

        $scope.filtered = $scope.users.slice(begin, end);
    });
});