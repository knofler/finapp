'use strict';

angular.module('finapp')
  .directive('fileShare', function () {
    return {
      templateUrl: 'app/directive/file-share/file-share.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });