'use strict';

angular.module('finapp')
  .directive('phone', function ($http,socket) {
    return {
      templateUrl: 'app/directive/phone/phone.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

        //phone call initial button setup
        scope.callBtn   = "Call";
        scope.callReady = true 


        scope.phoneNumber = []
        //capture numbers from dialpad
        $('.num').click(function () {
          var num = $(this);
          var text = $.trim(num.find('.txt').clone().children().remove().end().text());
          var telNumber = $('#telNumber');
          $(telNumber).val(telNumber.val() + text);
          scope.phoneNumber.push($(telNumber).val());
          console.log("inside",scope.phoneNumber)
         });
        

        //Make calls
        scope.makeCalls   = function (){
          var telNumber = $('#telNumber');
          var phoneNumber = $(telNumber).val();
          console.log("call made with number :: ",phoneNumber);
          $http.post('/makecall',{phone:phoneNumber});   
          scope.callBtn   ='HangUp';
          scope.callReady =false;
         };
        scope.hangUp      = function (){
          scope.callBtn   ='Call';
          scope.callReady =true;
         }; 
        scope.sendSms     = function (){
         $http.post('/sendsms');
         };  
        scope.getResponse = function (){
          $http.post('/getTwiml');
         };
       
       }//end of link
    };//end of return
  });//directive closes here