'use strict';

angular.module('finapp')
  .directive('status', function () {
    return {
      templateUrl: 'app/directive/status/status.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });