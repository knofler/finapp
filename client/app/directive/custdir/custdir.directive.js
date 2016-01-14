'use strict';

angular.module('finapp')
  .directive('custdir', function (dataSrv,$q,$timeout,$log) {
    return {
      templateUrl : 'app/directive/custdir/custdir.html',
      restrict    : 'EA',
      transclude  : true,
      scope:{
        render : '&onTap',
        data: "="
      },
      link : function (scope, element, attrs) {

        scope.transcludeVar  = "This is from directive,Is it visible outside?";

        scope.reddit     = new dataSrv();

      	console.log("element is : ", element);
      	console.log("each attrs is : ", attrs);

        scope.okGreet     = function (name){
            if (name == "rumman"){
              return true;
            }else{
              return false;
            }
           };
        scope.deferedtest = function (name) {
            var deferred = $q.defer();

            $timeout(function(){
              deferred.notify("About to greet  "+ name);
              if(scope.okGreet(name)){
                deferred.resolve("hello " +  name);
              }else{
                deferred.reject("Greeting " + name + " is not allowed");
              }
            },1000)

            return deferred.promise;
           };
        scope.changeDiv   = function (){
            element.hide();
           };   

        var promise = scope.deferedtest("rumman");
        promise.then(function(greeting){
            $log.info("Success " + greeting);
            },
            function(reason){
              $log.error("Failed " + reason);
            },
            function(update){
              $log.warn("Got notification " + update);
            }
            ); 

       }
      };
  });