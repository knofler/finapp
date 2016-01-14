'use strict';

angular.module('finapp')
  .directive('videoChat', function () {
    return {
      templateUrl: 'app/directive/video-chat/video-chat.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	var webrtc = new SimpleWebRTC({
	    // the id/element dom element that will hold "our" video
	    localVideoEl: 'localVideo',
	    // the id/element dom element that will hold remote videos
	    remoteVideosEl: 'remotesVideos',
	    // immediately ask for camera access
	    autoRequestMedia: true
	    });

	    // we have to wait until it's ready
	    webrtc.on('readyToCall', function () {
	    	// you can name it anything
	    	webrtc.joinRoom('your awesome room name');
	    });
	 
	    webrtc.on('joinedRoom', function () {
	      console.log("client joined  room");
		});
      	
    }//end of link
   };//end of return
 });//end f directive