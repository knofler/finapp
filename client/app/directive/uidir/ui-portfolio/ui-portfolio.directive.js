'use strict';

angular.module('finapp')
  .directive('uiPortfolio', function () {
    return {
      templateUrl: 'app/directive/uidir/ui-portfolio/ui-portfolio.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });