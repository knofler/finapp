'use strict';

angular.module('finapp')
  .directive('invoice', function () {
    return {
      templateUrl: 'app/directive/invoice/invoice.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });