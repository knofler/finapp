'use strict';

angular.module('finapp')
  .directive('cart', function ($http,socket,Auth,$location,main) {
    return {
      templateUrl: 'app/directive/cart/cart.html',
      restrict: 'EA',
      scope:{
        data:'='
      },
      link: function (scope, element, attrs) {

      scope.totalCost = 0 ; 
      scope.shipping  = 6.78;
      scope.subTotal  = 0 ;

      scope.savedtotalCost = 0 ; 
      scope.savedsubTotal  = 0 ;

      //control cart display
      scope.allcart   = true
      scope.savedcart = false;

      scope.showAllCart   = function(){
        scope.allcart   = true;
        scope.savedcart = false;
       };
      scope.showSavedCart = function(){
        scope.allcart   = false;
        scope.savedcart = true;
       };

      //get user info
      scope.getCurrentUser = Auth.getCurrentUser;  

      //Functions
      //go checkout
      scope.goCheckout          = function (cost) {
        //find item in checkout window and collect their details for order db
        var cartItems = [];
        //make the http call to get Cart data for display
        $http.get(scope.data.url+'notsaved',{
          params:{
            loggedin_user:scope.data.user
          }
         }).success(function(data){
          scope.payload = data;
          console.log("current cart is : ", scope.payload);
          socket.syncUpdates(scope.data.model,scope.payload); 
          $.each(scope.payload,function(i,d){
            cartItems.push({'cart_id':d._id,'item':d.name,"info":d.info,'created_by':d.produced_by,'img':d.img,'cost':d.cost,'genre':d.genre,'latitude':d.latitude,'longitude':d.longitude,'quantity':d.quantity});
           });
          var flatItems = _.flatten(cartItems);
          console.log('string is :: ', flatItems);
          //check if this user has any queued order
          $http.get('/api/orders/userorders/',{
            params:{
              userorder:scope.getCurrentUser().name,
              order_status:'queued'
            }
          }).success(function(gotData){
            console.log("gotData from order query is ::",  gotData);
            if(gotData == null){
              //inject data to order db for order placement
              $http.post('/api/orders',{
                // find item injection process
                items:flatItems,
                shipping:scope.shipping,
                subTotal:scope.subTotal,
                totalCost:scope.totalCost,
                order_status:'queued',
                ordered_by: scope.getCurrentUser().name,
                created_at: new Date()
               })
              .success(function(dataPost){
                // main.currentOrderID = dataPost._id;
                // console.log("dataPosted are :  ", dataPost._id);
                main.totalCost = cost;
                $location.path(scope.data.checkout);
               });
            }else{
              $location.path(scope.data.checkout);
            }
           });

         });
       };  
      scope.removeCartItem      = function (item,cost) {
        $http.delete(scope.data.url + item);
        socket.socket.emit("decarted",{costReduce:cost});
       };  
      scope.removeSavedCartItem = function (item,cost) {
        $http.delete(scope.data.url + item);
        socket.socket.emit("unsave",{costReduce:cost});
       };   
      scope.addBacktoCartItem   = function (item,cost) {
        $http.put(scope.data.url + item,{
           saved:false,
           saved_at: new Date()
         }).success(function(postData){
          $http.get(scope.data.url+'saved',{
              params:{
                loggedin_user:scope.data.user
              }
            }).success(function(data){
            scope.savedpayload = data;
            socket.syncUpdates(scope.data.model,scope.savedpayload);
           });
           //send socket data to re calculate cart cost
           socket.socket.emit("unsave",{costReduce:cost});
           socket.socket.emit("recarted",{cost:postData.cost,quantity:postData.quantity});
         });
       };   
      scope.saveCartItem        = function (item,cost) {
        $http.put(scope.data.url + item,{
           saved:true,
           saved_at: new Date()
         }).success(function(postData){
          //get new notsaved datas
           $http.get(scope.data.url+'notsaved',{
              params:{
                loggedin_user:scope.data.user
              }
            }).success(function(gotData){
              scope.payload = gotData;
              socket.syncUpdates(scope.data.model,scope.payload);
              console.log('scope.payload is :: ', scope.payload);
              //emit decarted socket for cost recalculation for remaining items
              socket.socket.emit("decarted",{costReduce:cost});
            }).then(function(){
              $http.get(scope.data.url+'saved',{
                params:{
                  loggedin_user:scope.data.user
                }
              }).success(function(gotSavedData){
                console.log("gotSavedData is :: ", gotSavedData);
                scope.savedpayload = gotSavedData;
                socket.syncUpdates(scope.data.model,scope.savedpayload);
                console.log('scope.savedpayload is :: ', scope.savedpayload);
              })//end of saved http call
            })//end of then
            //emit decarted socket for cost recalculation for remaining items
            console.log("pre append postData is :: ", postData);
            socket.socket.emit("saved",{cost:postData.cost,quantity:postData.quantity});
         });//end of put success call
       };   

      //make the http call to get Cart data for display
      $http.get(scope.data.url+'notsaved',{
        params:{
          loggedin_user:scope.data.user
        }
        }).success(function(data){
       scope.payload = data;
        $.each(data,function(i,d){
          scope.subTotal = scope.subTotal+d.cost*d.quantity;
        });
       scope.totalCost = scope.shipping+scope.subTotal;
       socket.syncUpdates(scope.data.model,scope.payload);
       });
      //get saved cart data
      $http.get(scope.data.url+'saved',{
        params:{
          loggedin_user:scope.data.user
        }
       }).success(function(data){
       scope.savedpayload = data;
        $.each(data,function(i,d){
          scope.savedsubTotal = scope.savedsubTotal+d.cost*d.quantity;
        });
       scope.savedtotalCost = scope.shipping+scope.savedsubTotal;
       socket.syncUpdates(scope.data.model,scope.savedpayload);
       });
      // ########## Event Controls with socketio #########

      //socket call on cartUpdate to update subtotal and totalCost
      socket.socket.on("appendCart",function(data){
        // console.log("data received from socket cost is :: ", data.cost);
        // console.log("data received from socket quantity is :: ", data.quantity);
        scope.subTotal +=(data.cost*data.quantity);
        scope.totalCost = scope.shipping+scope.subTotal;
       });
      socket.socket.on("appendSave",function(data){
        console.log("data received from socket cost is :: ", data.cost);
        console.log("data received from socket quantity is :: ", data.quantity);
        scope.savedsubTotal +=(data.cost*data.quantity);
        scope.savedtotalCost = scope.shipping+scope.savedsubTotal;
       });
      socket.socket.on("addbackCart",function(data){
        // console.log("data received from socket cost is :: ", data.cost);
        // console.log("data received from socket quantity is :: ", data.quantity);
        scope.subTotal +=(data.cost*data.quantity);
        scope.totalCost = scope.shipping+scope.subTotal;
       });
      socket.socket.on("removeCart",function(data){
        console.log("data received from socket cost is :: ", data.costReduce);
        // console.log("data received from socket quantity is :: ", data.quantity);

        //remove cart item and adjust cost
        scope.subTotal -= data.costReduce;
        scope.totalCost = scope.shipping+scope.subTotal;
       });
      socket.socket.on("removeSave",function(data){
        console.log("data received from socket cost is :: ", data.costReduce);
        // console.log("data received from socket quantity is :: ", data.quantity);
        scope.savedsubTotal -= data.costReduce;
        scope.savedtotalCost = scope.shipping+scope.savedsubTotal;
       });
      scope.$on('$destroy', function () {
        socket.unsyncUpdates(scope.data.model);
       });
      
      }//end of Link
    };//end of return
  });