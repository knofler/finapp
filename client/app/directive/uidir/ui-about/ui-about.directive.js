'use strict';

angular.module('finapp')
  .directive('uiAbout', function () {
    return {
      templateUrl: 'app/directive/uidir/ui-about/ui-about.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });