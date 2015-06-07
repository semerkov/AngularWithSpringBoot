angular.module('ngReallyClickModule', ['ui.bootstrap'])
    .directive('ngReallyClick', ['$modal',
        function($modal) {

            var ModalInstanceCtrl = function($scope, $modalInstance) {
                $scope.ok = function() {
                    $modalInstance.close();
                };

                $scope.cancel = function() {
                    $modalInstance.dismiss('cancel');
                };
            };

            return {
                restrict: 'A',
                scope:{
                    ngReallyClick:"&",
                    item:"="
                },
                link: function(scope, element, attrs) {
                    element.bind('click', function() {
                        var message = attrs.ngReallyMessage || "Are you sure ?";

                        var modalHtml = '<div class="modal-body"><h1>Warning</h1>' + message + '</div>';
                        modalHtml += '<div class="modal-footer"><button class="btn btn-danger" ng-click="ok()">Yes</button>';
                        modalHtml += '<button class="btn" ng-click="cancel()">No</button></div>';

                        var modalInstance = $modal.open({
                            template: modalHtml,
                            controller: ModalInstanceCtrl
                        });

                        modalInstance.result.then(function() {
                            scope.ngReallyClick({item:scope.item});
                        }, function() {
                            //Modal dismissed
                        });

                    });

                }
            }
        }
    ]);