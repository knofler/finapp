'use strict';

angular.module('finapp')
  .directive('stripeBasic', function (Auth) {
    return {
      templateUrl: 'app/directive/stripe-basic/stripe-basic.html',
      restrict: 'EA',
      scope:{
      	total:'='
      },
      link: function (scope, element, attrs) {

        console.log("for stripe basic total is:: ", scope.total);

      	//get user info
        scope.getCurrentUser = Auth.getCurrentUser;
        scope.userName = scope.getCurrentUser().name;
      }
    };
  });