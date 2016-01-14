'use strict';

angular.module('finapp')
  .directive('timelapse', function () {
    return {
      templateUrl: 'app/directive/timelapse/timelapse.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });