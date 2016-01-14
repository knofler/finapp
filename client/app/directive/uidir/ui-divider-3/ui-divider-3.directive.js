'use strict';

angular.module('finapp')
  .directive('uiDivider3', function () {
    return {
      templateUrl: 'app/directive/uidir/ui-divider-3/ui-divider-3.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });