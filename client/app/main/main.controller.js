// 'use strict';

angular.module('finapp')
  .controller('MainCtrl', function ($scope,FileUploader) {
    
  // @@@@@@@@@@@@@@@@@@@ DATA SOURCES and Models @@@@@@@@@@@@@@@@@@@@@@@
  // define csv path to display by the directive mostly used programatically used	
 	// $scope.url      = "assets/dataDir/apps.csv";
 	//define coldata to be used as col head
  	// $scope.coldata  = ['MachineName','PrimaryUser','SystemManufacturer','SystemProduct','SystemModel','CPUProduct','CPU Speed(MHz)','Device CreateDate','Hard DiskSpace','Free DiskSpace','IP Address'];

	
	//instantiate Fileuploader to pass on to photos directive
	$scope.uploader = new FileUploader({
	    // url: '/uploads'
	    // queueLimit: queueNumber
	 });

   //instantiate chart properties here for csv drop display
   $scope.chart ={
      type       :'area',
      dateFormat :'d/m/y', 
      tickCount  : 6,
     };
  });

  

