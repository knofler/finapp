'use strict';

angular.module('finapp')
  .directive('uiFooters', function () {
    return {
      templateUrl: 'app/directive/uidir/ui-footers/ui-footers.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });