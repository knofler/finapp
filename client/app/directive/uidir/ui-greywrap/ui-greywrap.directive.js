'use strict';

angular.module('finapp')
  .directive('uiGreywrap', function () {
    return {
      templateUrl: 'app/directive/uidir/ui-greywrap/ui-greywrap.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });