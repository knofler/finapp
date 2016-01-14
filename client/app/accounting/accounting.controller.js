'use strict';

angular.module('finapp')
  .controller('AccountingCtrl', function ($scope) {
    $scope.message = 'Hello';
	
    //Instantiate Accounting service
    $scope.accounting ={
      url        :'/api/accountings/',
      model      :'accounting',
      base       :'created_at',
      liveupdate : 'accounting',
      dateFormat :'iso',
      type       :'line',
      control    : true,
      axistype   :'timeseries',
      tickCount  :12,  
      columndata : ['created_at','Cost','Home','Bills','Payoff','Entertainment','Ciger','Groceries','Mortgage','Petrol','Food','Driving','Toll'],
      updateData :[]
     }

    //accounting tabs implementation 
    $scope.data = {
      fields:[ 
              {'name':'Product','header':'Product','type':'text','title':'Product','subtitle':'created_at','subtitle_header':'Entry Date'},
              {'name':'created_at','header':'Date','type':'date'},
              {'name':'Cost','header':'Cost','type':'number'},
              {'name':'Home','header':'Home','type':'number'},
              {'name':'Bill_Item','header':'Items','type':'text'},
              {'name':'Bills','header':'Bills','type':'number'},
              {'name':'Payoff','header':'Payoff','type':'number'},
              {'name':'Entertainment','header':'Entertainment','type':'number'},
              {'name':'Ciger','header':'Ciger','type':'number'},
              {'name':'Groceries','header':'Groceries','type':'number'},
              {'name':'Mortgage','header':'Mortgage','type':'number'},
              {'name':'Petrol','header':'Petrol','type':'number'},
              {'name':'Food','header':'Food','type':'number'},
              {'name':'Driving','header':'Driving','type':'number'},
              {'name':'Toll','header':'Toll','type':'number'},
              {'name':'Total_Expenses','header':'Total','type':'number'}
              ],
      url:'/api/accountings/',
      model:"accounting",
      modal:"accountings"
     }   

    //display tabs implementation 
    // $scope.data = {
    //   fields:[ 
    //           {'name':'title','header':'Title','type':'text','title':'Title','subtitle':'created_at','subtitle_header':'Entry Date'},
    //           {'name':'created_at','header':'Date','type':'date'},
    //           {'name':'article','header':'Article','type':'text'},
    //           {'name':'img','header':'Image','type':'img'},
    //           {'name':'cost','header':'Cost','type':'number'},
    //           {'name':'quantity','header':'Quantity','type':'number'},
    //           {'name':'latitude','header':'Latitude','type':'text'},
    //           {'name':'longitude','header':'Longitude','type':'text'},
    //           {'name':'created_by','header':'Created by','type':'text'}
    //           ],
    //   url:'/api/displays',
    //   model:"display",
    //   modal:"displays"
    //   };   

  });
