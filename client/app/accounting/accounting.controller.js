'use strict';

angular.module('finapp')
  .controller('AccountingCtrl', function ($scope,socket,pageCtrlSrv) {
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
              {
                'name':'Product',
                'header':'Product',
                'type':'text',
                'title':'Product',
                'subtitle':'created_at',
                'subtitle_header':'Entry Date'
                // 'noform'         :'true',
                // 'auto_generate'  :'true',
                // 'auto_pattern'   :'E'
               },
              {'name':'created_at','header':'Date','type':'date'},//if not required in form use 'noform':'true'
              {'name':'Cost','header':'Cost','type':'number'},//if not required in add form use 'add_disable':'true'
              {'name':'Home','header':'Home','type':'number'},
              {'name':'Bill_Item','header':'Items','type':'text'},
              {'name':'Bills','header':'Bills','type':'number'},
              {'name':'Payoff','header':'Payoff','type':'number'},
              {'name':'Entertainment','header':'Entertainment','type':'number'},
              {'name':'Ciger','header':'Ciger','type':'number'},
              {'name':'Groceries','header':'Groceries','type':'number'},//if dont want style use,'style':'false'
              {'name':'Mortgage','header':'Mortgage','type':'number'},
              {'name':'Petrol','header':'Petrol','type':'number'},
              {'name':'Food','header':'Food','type':'number'},
              {'name':'Driving','header':'Driving','type':'number'},
              {'name':'Toll','header':'Toll','type':'number'},
              {'name':'Total_Expenses','header':'Total','type':'number'}
              ],
      subheader:'Accounting for everyday expenses',        
      url:'/api/accountings/',
      sockets:'accounting',
      model:"accounting",
      modal:"accountings"
     };

    //On Sockets Add notification, execute function 
    socket.socket.on("accountingAddNotify",function(data){
      console.log('accountingAddNotify socket arrived with data', data);
      //send email for approval
      // $scope.sendMail('rumman.ahmed@mq.edu.au','CAB Approval',"Please approve the CAB"); 
      });
    //On Sockets Update notification, execute function
    socket.socket.on("accountingUpdateNotify",function(data){
      console.log('accountingUpdateNotify socket arrived with data', data);
      //Approved notification recieved
      // $scope.sendMail('rumman.ahmed@mq.edu.au','CAB Approval',"Approved/Declined CAB Request"); 
     });      

  });
