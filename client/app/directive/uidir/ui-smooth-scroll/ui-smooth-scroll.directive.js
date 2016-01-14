'use strict';

angular.module('finapp')
  .directive('uiSmoothScroll', function ($location, $anchorScroll) {
    return {
      templateUrl: 'app/directive/uidir/ui-smooth-scroll/ui-smooth-scroll.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	// scroll to feature included for SPA App
	  	scope.scrollTo    = function(id) {
	      $location.hash(id);
	      $anchorScroll();
	     };

      }
    };
  });