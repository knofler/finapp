'use strict';

angular.module('finapp')
  .directive('cards', function () {
    return {
      templateUrl: 'app/directive/cards/cards.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });