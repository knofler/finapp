'use strict';

angular.module('finapp')
   .directive('stripeCustom', function ($http,socket,Auth) {
    return {
      templateUrl: 'app/directive/stripe-custom/stripe-custom.html',
      restrict: 'EA',
      scope:{
        source:'=',
        closeModal: '&modalctrl'
       },
      link: function (scope, element, attrs) {

        //get user info
        scope.getCurrentUser = Auth.getCurrentUser;  

        //collect form data for posting to stripe
        scope.formData = {}; 
        scope.cartids = [];
        // console.log('scope.formData.amount is :: ', scope.formData.amount )
        // console.log("checkout total is :: ", scope.total)
        // console.log("OrderId is :: ", scope.orderid);

        // get orders data based on conditions ready for checkout
        $http.get('/api/orders/userorders/',{
            params:{
              userorder:scope.getCurrentUser().name,
              order_status:'queued'
            }
          }).success(function(gotData){
          // console.log("gotData in checkout directive is ::", gotData);
          scope.orders = gotData;
          // console.log("payload in checkout directive is :: ", scope.orders)
          // console.log("order id in checkout directive is :: ", scope.orders._id);
          gotData.items.forEach(function(d){
            scope.cartids.push(d.cart_id);
            // console.log("cart id in checkout directive is :: ", d.cart_id);
           });
          console.log("scope.cart_ids in checkout directive is :: ", scope.cartids);
          // console.log("totalCost in checkout directive is :: ", scope.orders.totalCost)
          scope.formData.amount = parseInt((scope.orders.totalCost)*100);
          socket.syncUpdates(scope.source.model,scope.orders);
        }); 

        scope.saveCustomer = function(status, response) {
          console.log("formdata is :: ",  scope.formData);
          console.log("response is :: ",  response);
          console.log("status is   :: ",  status);
          $http.post('/charge', { 
            cartids  :scope.cartids,
            orderid  :scope.orders._id,
            token    :response.id,
            name     :scope.formData.name,
            amount   :scope.formData.amount,
            email    :scope.formData.email 
           });
          scope.closeModal();
         }; 

      }
    };
  });