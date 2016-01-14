	'use strict';

angular.module('finapp')
  .controller('ChartCtrl',function ($scope) {
 
  	//Instantiate charts service
  	$scope.chart ={
      url        :'/api/charts/',
      model      :'chart',
      base       :'created_at',
      dateFormat :'iso',
      type       :'line',
      graph      : true,
      axistype   :'timeseries',
      tickCount  : 10, 
      columndata : ['created_at','data1','data2','data3','data4'],
      updateData :['data5','data6']
     }

    $scope.csv_chart ={
      url        :'/assets/dataDir/2015/jan.csv',
      model      :'accounting',
      base       :'created_at',
      dateFormat :'d/m/y', 
      type       :'line',
      control    : true,
      axistype   :'timeseries',
      tickCount  : 6,  
      columndata : ['created_at','Cost','Home','Bills','Payoff','Entertainment','Ciger','Groceries','Mortgage','Petrol','Food','Driving','Toll'],
      updateData :[]
     }
  });
