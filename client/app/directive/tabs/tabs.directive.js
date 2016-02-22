'use strict';

angular.module('finapp')
.controller('ModalDisplayInstanceCtrl', function ($scope,$http,socket,pageCtrlSrv,$modalInstance,$filter) {
		    console.log("$scope.showmodalinfo is " , $scope.showmodalinfo)
			var url = $scope.showmodalinfo.config.url+$scope.showmodalinfo.id;

		  	$http.get(url).success(function(gotData){
		  	  $scope.displayData = gotData;	
		  	  $scope.showmodalinfo.fields.forEach(function(data){
		  	  	// console.log("data is ", data.type);
		  	  	if (data.type === 'number' && data.style !== 'false'){
		  	  		$scope.displayData[data.name] = $filter('currency')($scope.displayData[data.name]);
		  	  		// console.log("found number type data", $scope.displayData[data.name])
		  	  	}else if( data.type === 'date' && data.style !== 'false'){
		  	  		$scope.displayData[data.name] = $filter('date','yyyy-MM-dd')($scope.displayData[data.name]);
		  	  		// console.log("found date type data", $scope.displayData[data.name])
		  	  	}else if( data.type === 'text' || data.type === 'select' || data.type === 'radio' && data.style !== 'false'){
				  	$scope.displayData[data.name] = $filter('capitalize')($scope.displayData[data.name]);
				 }
		  	  })
		  	  socket.syncUpdates($scope.showmodalinfo.model,$scope.displayData);
		  	 });

		  	//control mechanism to manage items for display and add forms
		    // $scope.number = true;
		    // $scope.text   = false;

			$scope.ok     = function () {
			    $modalInstance.close();
			   };
			$scope.cancel = function () {
			    $modalInstance.dismiss('cancel');
			   };
	     })
.controller('ModalAddInstanceCtrl',function ($scope,$http,socket,pageCtrlSrv,$modalInstance,Auth,$cookies,$filter) {
		  
   console.log("$scope.addmodalinfo is " , $scope.addmodalinfo)
   var url = $scope.addmodalinfo.config.url;
   console.log("add model is :: ", $scope.addmodalinfo.config.model);
   
   $scope.formData       = {};
   $scope.getCurrentUser = Auth.getCurrentUser;
   $scope.userInfo       = [];

   //control mechanism to manage items for display and add forms
   $scope.select = true;
   $scope.text   = false;

   //get last inserted id
   $scope.addmodalinfo.fields.forEach(function(eachfield){
		// console.log("auto generate code is: ",eachfield.auto_generate);
		if(eachfield.auto_generate == 'true'){
			console.log("eachfield.name is :: ", eachfield.name);
			console.log("newAutoField is :: ", $scope.newAutoField);
			  $scope.auto_field($scope.addmodalinfo.config.modal,eachfield.name,eachfield.auto_pattern); 
			console.log("$scope.formData is ", $scope.formData[eachfield.name]);
		}
		});

   // $scope.getLastEntry($scope.addmodalinfo.modal); 
   // $scope.getLastID($scope.addmodalinfo.modal); 

   $scope.add    = function () {

   	 //get Post Data content to be used for email notification
     var notification = '';
   	
   		// ########## AUTO GENERATE ###############
	   	//used for auto-generate fileds
	   	$scope.addmodalinfo.fields.forEach(function(eachfield){
			// console.log("auto generate code is: ",eachfield.auto_generate);
			//check if auto generate is enabled
			if(eachfield.auto_generate == 'true'){
				console.log("eachfield.name is :: ", eachfield.name);
				console.log("newAutoField is :: ", $scope.newAutoField);
				//check if auto pattern is available, if not auto default to '0'
				if($scope.newAutoField ==''){
				  $scope.formData[eachfield.name] = 0
				}else{
				  //before using initial lastID gathered from past call, on form submit making sure no one has used that id	
				  $http.get($scope.addmodalinfo.config.url+'last/').success(function(getLastEntry){
				  	// console.log("change_no is :: ",getLastEntry[eachfield.name] )
				  	//check if this is the first entry or not
				  	if(getLastEntry[eachfield.name] == undefined){
				  	  $scope.formData[eachfield.name] = $scope.newAutoField
				  	  // console.log("inside newAutoField is :: ", $scope.newAutoField);
				  	  // console.log("inside $scope.formData is ", $scope.formData[eachfield.name]);
				  	}else{
				  		// console.log("function recieved data : model-> ",model, 'autofield -> ', autofield , ' pattern -> ', pattern  );
			            var lastEntry = getLastEntry[eachfield.name];
			            console.log("lastEntry is :: ", lastEntry);
			            //remove numaric data from mixed string
			            if(lastEntry !== undefined){
			              var numbersData = lastEntry.replace(/\D/g,'');
			              //increament number
			              numbersData++;  
			              $scope.newAutoField = eachfield.auto_pattern+numbersData;
			              $scope.formData[eachfield.name] = $scope.newAutoField;
			            }else{
			              $scope.newAutoField = eachfield.auto_pattern+1;
			              $scope.formData[eachfield.name] = $scope.newAutoField;
			             }
				  	}
		            
				  });//end of $http success
				}//end of newAutoField from Modal launcgh from pageCtrlSrv function
				// console.log("$scope.formData is ", $scope.formData[eachfield.name]);
			 }//check if auto generate is enabled if-else 
	   	 });

	   	console.log("scope.address" , $scope.address);
      	if(Object.keys($scope.address).length !== 0){
        	console.log("scope.address.selected is :: ", $scope.address.selected.formatted_address);
        	$scope.formData['location'] = $scope.address.selected.formatted_address;
      	 }
	   	//default fileds for add forms
   		$scope.formData['created_at'] 		= new Date();
        $scope.formData['created_by'] 		= $scope.getCurrentUser().name; 
        $scope.formData['created_by_id'] 	= $scope.getCurrentUser()._id;
        $scope.formData['created_by_email'] = $scope.getCurrentUser().email;     
        $scope.formData['latitude']   		= $scope.getLatitude;
        $scope.formData['longitude']  		= $scope.getLongitude;

       
        
        // ########## POST TO DB ###############
        //Add data to database
        setTimeout(function(){
 		  $http.post(url,$scope.formData).success(function(senddata){
 		  	notification = senddata;	
        	});
         },200);
		
		// ########## SOCKETS ###############       
        //this is specific socket data tab specific.
        if($scope.addmodalinfo.config.sockets !== undefined){
			setTimeout(function(){
				//this is default socket as any form data added
		        	socket.socket.emit("data_added",{
		        		model:$scope.addmodalinfo.config.model,
		        		update:notification
		        	 });

					socket.socket.emit($scope.addmodalinfo.config.sockets+'_added',{
	        			model:$scope.addmodalinfo.config.model,
		        		update:notification
					 });
	         },600);
         }

		// ########## EMAILS ###############   
		//check if email notification is required for add form
    	if($scope.addmodalinfo.config.emails == 'true'){
		    setTimeout(function(){
		    	$scope.send_notification_email('add',$scope.addmodalinfo.config.model,notification);
    	 	},500);
    	 };
		   
        // ########## PAGE NOTIFICATION ###############
        var data = '<strong>'+$scope.getCurrentUser().name+'</strong>' + ' added new record ' + $scope.formData[$scope.addmodalinfo.fields[0].title] ;
        // console.log(data);  
        // Send notification broadcast to all connected users
        pageCtrlSrv.send_notification(data);
        
        // ########## COOKIES ###############
        //add information to cookies
        if(Object.keys($cookies).length >0 ){
          // $cookies.purchase = true;
          console.log($cookies);
         }

		$modalInstance.close();
	 };
   $scope.ok     = function () {
	    $modalInstance.close();
	   };
   $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');   
	    };
  	    	
  })
.controller('ModalEditInstanceCtrl',function ($scope,socket,$http,pageCtrlSrv,$modalInstance,Auth,$filter) {
		  
	$scope.EditformData    = {}; 
	$scope.getCurrentUser  = Auth.getCurrentUser;
	$scope.userInfo        = [];
	
	var url = $scope.editmodalinfo.config.url+$scope.editmodalinfo.id;
	console.log("edit url is :: ", url);
	console.log("edit model is :: ", $scope.editmodalinfo.config.model);


	$http.get(url).success(function(gotData){
        $scope.EditData = gotData;
        socket.syncUpdates($scope.editmodalinfo.config.model,$scope.EditData)
     });

	//control mechanism to manage items for display and add forms
    $scope.select = true;
    $scope.text   = false;

	$scope.edit    = function (itemID){

		//get Post Data content to be used for email notification
    	var notification = '';
		
		//update tables with form data
		$scope.EditformData['edited_at']       = new Date();
	    $scope.EditformData['edited_by']       = $scope.getCurrentUser().name;
	    $scope.EditformData['edited_by_id']    = $scope.getCurrentUser()._id;
	    $scope.EditformData['edited_by_email'] = $scope.getCurrentUser().email;
	    $scope.EditformData['latitude']  	   = $scope.getLatitude;
	    $scope.EditformData['longitude']       = $scope.getLongitude;
  
     	$http.put(url,$scope.EditformData).success(function(senddata){
			notification = senddata;	
 	   		});
		
		// ########## SOCKETS ###############
    	//this is specific socket data tab specific.
    	if($scope.editmodalinfo.config.sockets !== undefined){
	    	setTimeout(function(){
		    	socket.socket.emit("data_updated",{
		    		model:$scope.editmodalinfo.config.model,
		    		update:notification
		    	 });
				socket.socket.emit($scope.editmodalinfo.config.sockets+'_updated',{
	    			model:$scope.editmodalinfo.config.model,
	        		update:notification
				 });
			},600);	
    	 }

     	// ########## EMAILS ###############   
		//check if email notification is required for add form
    	if($scope.editmodalinfo.config.emails == 'true'){
		    setTimeout(function(){
		    	$scope.send_notification_email('edit',$scope.editmodalinfo.config.model,notification);
    	 	},500);
    	 };
  

	    // ########## PAGE NOTIFICATION ###############
	    var data = '<strong>'+$scope.getCurrentUser().name+'</strong>' + ' edited record ' + $scope.editmodalinfo.id ;
	    // console.log(data);  

	    // Send notification broadcast to all connected users
	    pageCtrlSrv.send_notification(data);
	   
		$modalInstance.close();

	    }; 
	$scope.ok      = function () {
	    $modalInstance.close();
	  };
	$scope.cancel  = function () {
	    $modalInstance.dismiss('cancel');
	   };
  	})
.controller('ModalDeleteInstanceCtrl',function ($scope,$http,pageCtrlSrv,socket,$modalInstance,Auth) {
  
	var url = $scope.deletemodalinfo.config.url+$scope.deletemodalinfo.id;
	console.log("edit url is :: ", url);

	$http.get(url).success(function(gotData){  
      $scope.DeleteData = gotData;
      socket.syncUpdates($scope.deletemodalinfo.config.model,$scope.deleteData)
     });

  	$scope.getCurrentUser     = Auth.getCurrentUser;

    $scope.ok     = function () {
	    $http.delete(url).success(function(){
	      // console.log("Purchase Record : " + $scope.purchaseDeleteData[$scope.purchaseDeleteData.length -1].faculty_ref + " deleted at " + new Date() + " by " + $scope.getCurrentUser().name);
	      
	      // **************Notification*********************
	      var data = '<strong>'+$scope.getCurrentUser().name+'</strong>' + ' deleted '+ $scope.deletemodalinfo.config.model+ ' record ' + $scope.DeleteData[deletemodalinfo.fields[0]].title; 	
	      // console.log(data);  

	      // Send notification broadcast to all connected users
	      pageCtrlSrv.send_notification(data); 
	     });
	    $modalInstance.close();
	    };
    $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
 	      })
.controller('ModalCSVInstanceCtrl',function ($scope,$http,socket,pageCtrlSrv,$modalInstance,Auth) {

		  var url = '/api/'+$scope.tabname +'/';
		  // making pageCtrlSrv function available for the controller
		  $scope.csvOut    = pageCtrlSrv.csvOut;
		  console.log("pageCtrlSrv.tabname is : ", $scope.tabname)
		  //get all colums fields available from the dataRepo
		  $http.get(url).success(function(gotData){
		  	console.log("gotData from url is :: ", gotData);
		  	$scope.dataRepo = gotData;
		  	$scope.columns = Object.keys($scope.dataRepo[0]);
		  });
		  // $scope.columns = Object.keys(pageCtrlSrv.purchaseRepo[0]);
		  // console.log($scope.columns);
		  //grab modal form input as custom field options for reporting
		  $scope.formData        = {};
		  //get all data for each selected id and store in this array.
		  $scope.selectDataArray = [];
		  //auth service call 
		  $scope.getCurrentUser  = Auth.getCurrentUser;

		  $scope.getCustomReport = function(){
		    var customData = [];
		    //insert field choices and selected rows data into customData array.
		    $scope.selectDataArray.forEach(function(getEachRow){
		    	console.log("getEachRow is :: ",getEachRow);
		      $scope.formData.columns.forEach(function(getEachColumn){
		        // console.log("for each row data is : ", getEachRow);
		        // console.log("for each row coulmn selected is : ", getEachColumn);
		        console.log("for each row Custom data auto select is : ", getEachRow[getEachColumn]);
		        customData.push(getEachRow[getEachColumn]);
		       });
		      console.log('customData inside is : ' , customData);
		     });
		    console.log("total fields ",$scope.formData.columns.length);
		    console.log('customData is : ' , customData);
		    console.log('$scope.formData.columns.length is : ' , $scope.formData.columns.length);
		    console.log('$scope.formData.columns is : ' , $scope.formData.columns);

		    // console.log('customData is : ' , customData);
		    //push customData array for csv conversion
		     $scope.csvOut(customData,$scope.formData.columns.length,$scope.formData.columns);
		    //close modal after updated
		    $modalInstance.close(); 
		   };
  
		  //run function on every selected items
		  $("input:checked").each(function(){
		    $http.get(url+this.id).success(function(getData){
		     $scope.selectDataArray.push(getData); 
		      console.log(getData);
		     });
		  });

		  //   // **************Notification*********************
		  // setTimeout(function(){
		  //  var data = '<strong>'+$scope.getCurrentUser().name+'</strong>' + ' added ' + deviceData.length + ' devices.';
		  //  // console.log(data);  

		  //  // Display successfull message  
		  //  $("#deviceSuccess")
		  //  .show()
		  //  .html("<h4>You have successfully added " + deviceData.length + " devices to inventory.</h4>")
		  //  .delay(7500)
		  //  .fadeOut("slow")

		  //  // Send notification broadcast to all connected users
		  //  pageCtrlSrv.send_notification(data);
		  //  },1000);
  
		  $scope.ok            = function () {
		    $modalInstance.close();
		  };
		  $scope.cancel        = function () {
		    $modalInstance.dismiss('cancel');   
		 };
  	   		})
.controller('ModalUserInfoInstanceCtrl',function ($scope,userInfo,pageCtrlSrv,oneID,$modalInstance) {
      //Access userInfo function for user profile data.
      userInfo.userProfile(oneID);

      //Access pageCtrlSrv function for showing application data
      $scope.showData = pageCtrlSrv.showData;

      $scope.ok = function () {
        $modalInstance.dismiss('cancel');
        };
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
        };
      })
.directive('tabs', function ($http,socket,pageCtrlSrv,userInfo,Auth,$timeout,$filter) {
    return {
      templateUrl: 'app/directive/tabs/tabs.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

      	  //get user info
		  scope.getCurrentUser = Auth.getCurrentUser;
		  var rootRepo = scope.data.config.model+"Repo"
		  console.log("rootRepo is : ", rootRepo)

	      $http.get(scope.data.config.url).success(function(getData){
	            scope.dataRepo=getData;
	            // console.log("scope.dataRepo is : ", scope.dataRepo);
	          	// console.log("data is ", scope.data.config.fields);
	          	scope.dataRepo = scope.formatData(getData);
	          	
	             scope.columns = Object.keys(scope.dataRepo[0]);
	             pageCtrlSrv[rootRepo] = scope.dataRepo;
	             // console.log("pageCtrlSrv[rootRepo] is ::", pageCtrlSrv.purchaseRepo)
	             socket.syncUpdates(scope.data.config.model,scope.dataRepo);
	          });

		  scope.formatData = function (data) {
			 	data.forEach(function(eachdata){
	          		scope.data.fields.forEach(function(eachfield){
		          		// console.log("each data.type is : " ,eachfield.type)
		          		// console.log("each data.name is : " ,eachfield.name)
		          		// console.log("scope.dataRepo[data.name]", eachdata[eachfield.name])
				  	  	if (eachfield.type === 'number' && eachfield.style !== 'false'){
				  	  		eachdata[eachfield.name] = $filter('currency')(eachdata[eachfield.name]);
				  	  		// console.log("found number type data", scope.dataRepo)
				  	  	}else if( eachfield.type === 'date' && eachfield.style !== 'false'){
				  	  		eachdata[eachfield.name] = $filter('date','yyyy-MM-dd')(eachdata[eachfield.name]);
				  	  		// console.log("found date type data", scope.dataRepo[data.name])
				  	  	}else if( eachfield.type === 'text' || eachfield.type === 'select' || eachfield.type === 'radio' && eachfield.style !== 'false'){
				  	  		eachdata[eachfield.name] = $filter('capitalize')(eachdata[eachfield.name]);
				  	  	}

				  	  	// console.log("data.repo is :: ",scope.dataRepo);
			  	  	})
	          	});
	          	console.log("scope.formatData ran,now to return data");
	          	return data;
		     }	
     	
		  //Data Added socket notification recieved and execute function   
	      socket.socket.on("appendDataView",function(data){
	          	console.log('appendDataView socket arrived with data', data);
	          	// scope.formatData(data);
	           });
	      //Data Updated socket notification recieved and execute function   
	      socket.socket.on("updateDataView",function(data){
	          	console.log('updateDataView socket arrived with data ', data);
	          	// scope.formatData(data);
	          });

      	  //pageCtrlSrv function available for application controller
	  	  scope.addModalData    = pageCtrlSrv.addModalData;
	  	  scope.deleteModalData = pageCtrlSrv.deleteModalData;
	  	  scope.editModalData   = pageCtrlSrv.editModalData;
	  	  scope.showModalData   = pageCtrlSrv.showModalData;
	  	  scope.userDetails     = pageCtrlSrv.popUsers;
	  	  scope.popCSV          = pageCtrlSrv.popCSV;

		  //pagination parameters  
		  scope.totalList   = false;
		  scope.searchBox   = false;
		  scope.totalItems  = '';
		  scope.currentPage = 1;
		  scope.pageSize    = 8;
		  scope.maxSize     = 10; //pagination max size is 10

		  //search pagination
		  scope.searchItems    = '';

		  //search pagination event
		  $(document).on('keyup','#input-search',function(){
		      scope.searchPag=true;
		      scope.searchflip = true;
		      $('#searchPag').show();
		      $('#searchflip').show();
		      var searchField = $('#input-search').val();
		        if(searchField == ''){
		          scope.searchPag=false;
		          scope.searchflip = false;
		          $('#searchPag').hide();
		          $('#searchflip').hide();
		        }      
		     });

		  //PAGE ACCESS CONTROL
		  // scope.hasReadAccess("application",Auth.getCurrentUser().email);


		  //pagination and page control functions
		  scope.setTotalItems  = function (){
				scope.totalItems= scope.dataRepo.length;
		   		};
		  scope.showAll        = function (){
	  			scope.totalItems= scope.dataRepo.length;
		    	scope.search='';  
				scope.totalList=true;
				scope.searchBox=true;
			    $('#searchPag').hide();
			    $('#searchflip').hide();
			   };
		  scope.searchData     = function (){
			      scope.currentPage =1;
			      scope.pageSize = 8;
			      scope.totalList=false;
			      scope.searchBox=false;
			      $('input:checkbox').removeAttr('checked');
			     };
		  scope.filter         = function (){
			   $timeout(function() { 
			      //wait for 'filtered' to be changed
			      /* change pagination with scope.filtered */
			      scope.searchItems= scope.filtered.length;
			      scope.totalItems = Math.ceil(scope.filtered.length/scope.pageSize);
			    }, 10);
			  };

		  scope.hasWriteAccess(scope.data.config.model,Auth.getCurrentUser().email);
		  scope.hasFullAccess(scope.data.config.model,Auth.getCurrentUser().email);	  
		  
		  //on directive load function run
		  setTimeout(function(){
          	scope.setTotalItems();
           },100);		  
			 
       }//end of loan
    };//end of return
  });//end of directive	


