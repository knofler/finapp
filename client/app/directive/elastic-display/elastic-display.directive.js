'use strict';

angular.module('finapp')
  .directive('elasticDisplay', function ($timeout,Display,$http,socket) {
    return {
      templateUrl: 'app/directive/elastic-display/elastic-display.html',
      restrict: 'EA',
      scope:{
        source:'='
      },
      link: function (scope, element, attrs) {
      	  //make the http call to elastic search to get the data for display
          $http.post('/display_data',{
            index:scope.source.index,
            type:scope.source.model,
            query:''
            }).success(function(data){
            scope.payload = data.hits.hits;
            console.log("data from ES is :: ", data)
            console.log("payload from ES is :: ", data.hits.hits)
           });

          //run this directive local calculate function to reinitialize Display class as data changes
          scope.calculate          = function () {
            // console.log("element passed on was :: ", element);
            // console.log("attrs passed on was :: ", attrs);
            // console.log("innerHTML passed on was :: ", element[0].children); 
            var test = new Display();
            // console.log("test is ::: ", test) 
              // console.log("test.test() is ::: ", test.test()); 
                $('#pinBoot').pinterest_grid({
                    no_columns: 4,
                    padding_x: 10,
                    padding_y: 15,
                    margin_bottom: 55,
                    single_column_breakpoint: 701
                   });
           };

          //On Socket notification update page
          socket.socket.on('modelchange',function(data){
            console.log("modelChange data ",  data)
              scope.calculate();
           }); 
      	
          //Define Global variables for this directive
          var DisplayName = 'pinterest_grid';

           //Instantiate Display  
          $.fn[DisplayName] = function (options) {
            // console.log("this here is :: ", this)
            return this.each(function () {
                if (!$.data(this, 'Display_' + DisplayName)) {
                    $.data(this, 'Display_' + DisplayName,
                    new Display(this, options,DisplayName,scope.payload));
                }
            });
            };

          // console.log("$.fn :: ", $.fn[DisplayName]);

          //use pinterest style grid here    
          $('#pinBoot').pinterest_grid({
            no_columns: 4,
            padding_x: 10,
            padding_y: 10,
            margin_bottom: 50,
            single_column_breakpoint: 700
           });

          scope.filter        = function(){
            $timeout(function() { 
              //wait for 'filtered' to be changed
              /* change pagination with $scope.filtered */
              scope.searchItems= scope.filtered.length;
              scope.totalItems = Math.ceil(scope.filtered.length/scope.pageSize);
             }, 10);
          };

      }
    };
  });