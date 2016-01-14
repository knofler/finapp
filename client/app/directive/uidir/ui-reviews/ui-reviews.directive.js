'use strict';

angular.module('finapp')
  .directive('uiReviews', function () {
    return {
      templateUrl: 'app/directive/uidir/ui-reviews/ui-reviews.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });