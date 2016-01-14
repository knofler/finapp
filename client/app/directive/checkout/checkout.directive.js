'use strict';

angular.module('finapp')
 .directive('checkout', function ($http,socket,Auth,main) {
    return {
      templateUrl: 'app/directive/checkout/checkout.html',
      restrict: 'EA',
      scope:{
        source:'='
      },
      link: function (scope, element, attrs) {

        scope.costToCharge   = main.totalCost;
        scope.currentOrderID = main.currentOrderID;
        // console.log("got source here:  ",scope.source)
        // console.log("scope.currentOrderID:: ",  scope.currentOrderID);

        //get user info
        scope.getCurrentUser = Auth.getCurrentUser;  

        // #*##*#M#*##*##*#MODAL SETUP#*##*##*##*##*##*#  
        //variables
        scope.modalShown    = false;
      
        scope.checkoutModal         = function () {
          scope.modalShown = !scope.modalShown;
         };    
        scope.close_directive_modal = function(){
          scope.modalShown    = false;
          console.log("I am from checkout directive and I have been executed")
         };  

        // get orders data based on conditions ready for checkout
        $http.get('/api/orders/userorders/',{
            params:{
              userorder:scope.getCurrentUser().name,
              order_status:'queued'
            }
          }).success(function(gotData){
          console.log("gotData in checkout directive is ::", gotData);
          scope.orders = gotData;
          // console.log("payload in checkout directive is :: ", scope.orders)
          // socket.syncUpdates(scope.source.model,scope.orders);
        }); 
      }
    };
  });