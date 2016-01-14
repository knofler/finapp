'use strict';

angular.module('finapp')
  .directive('uiDivider2', function () {
    return {
      templateUrl: 'app/directive/uidir/ui-divider-2/ui-divider-2.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });