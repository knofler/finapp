'use strict';

angular.module('finapp')
  .directive('uiJoin', function () {
    return {
      templateUrl: 'app/directive/uidir/ui-join/ui-join.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });