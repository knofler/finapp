'use strict';

angular.module('finapp')
  .directive('uiListings', function () {
    return {
      templateUrl: 'app/directive/uidir/ui-listings/ui-listings.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });