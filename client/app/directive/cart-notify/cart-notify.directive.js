'use strict';

angular.module('finapp')
    .directive('cartNotify', function ($http,socket,Auth,$location,main) {
    return {
      templateUrl: 'app/directive/cart-notify/cart-notify.html',
      restrict: 'EA',
      scope:{
      	data:'='
      },
      link: function (scope, element, attrs) {

      	scope.totalCost = 0 ; 
      	scope.shipping  = 6.78;
      	scope.subTotal  = 0 ;


      	//get user info
  		scope.getCurrentUser = Auth.getCurrentUser; 

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
	          socket.syncUpdates(scope.data.model,scope.payload); 
	          $.each(data,function(i,d){
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
	            console.log("gotData is ::",  gotData);
	            if(gotData == null){
	              //inject data to order db for order placement
	              $http.post('/api/orders',{
	                // find item injection process
	                items:flatItems,
	                shipping:scope.shipping,
	                subTotal:scope.subTotal,
	                totalCost:scope.totalCost,
	                order_status:'queued',
	                created_by: scope.getCurrentUser().name,
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

	    // ***********************************Communication socket function*************************
	    $http.get('/api/carts/notsaved').success(function(data){
       		scope.payload = data;
	        $.each(data,function(i,d){
	          scope.subTotal = scope.subTotal+d.cost*d.quantity;
	        });
	         scope.totalCost = scope.shipping+scope.subTotal;
	         socket.syncUpdates('cart',scope.payload);
		  });

	    //socket call on cartUpdate to update subtotal and totalCost
	    socket.socket.on("appendCart",function(data){
		    // console.log("data received from socket cost is :: ", data.cost);
		    // console.log("data received from socket quantity is :: ", data.quantity);
		    scope.subTotal +=(data.cost*data.quantity);
		    scope.totalCost = scope.shipping+scope.subTotal;
		   $(".cartControl").fadeIn("slow") 
	       setTimeout(function(){
	         $(".cartControl").delay(500).fadeOut("slow");  
	        },8000);
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

	     
      }//end of link
    };//end of return
  });//end of directive