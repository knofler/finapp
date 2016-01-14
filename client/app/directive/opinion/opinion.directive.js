'use strict';

angular.module('finapp')
  .directive('opinion', function () {
    return {
      templateUrl: 'app/directive/opinion/opinion.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

      	//root jquery to hide rest divs and set up the main page
   $(document).ready(function(){
       $(".back_button").hide();
       $(".sec_li").hide();
       
      //Main buttons jquery
      $(".main_li").each(function(){
         
         $(this).click(function(){
            $(".main_btn").addClass("select_mode");
            $(this).siblings().hide();
            $(".sec_li").show();
            //Click function for each sub buttons to register the status
            $(".sec_btn").click(function(){
               var getMode=$(this).text();
               //update the DOM for status
                 var change_me = document.getElementById("change_me"); 
                 change_me.innerHTML=getMode;
            });
            
            //Go Back button jquery
            $(".back_button").show();
            $(".back_button").click(function(){
              $(".sec_li").hide();
              $(".main_li").show();
              $(this).hide();
              $(".main_btn").removeClass("select_mode");
             });
            
         });
         
      });
      
   });




      }
    };
  });