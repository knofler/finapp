'use strict';

angular.module('finapp')
  .controller('NavbarCtrl', function ($scope, $location,userInfo, Auth) {
    $scope.menu               = [
      // {'title': 'Home','link': '/'},
      {'title': 'Accounting','link':'/accounting','popMsg':'Accounting','acl':'user'},
      {'title': 'Display','link':'/display','popMsg':'Display','acl':'user'},
      {'title': 'Chart','link':'/chart','popMsg':'Chart','acl':'user'},
      {'title': 'CSV','link':'/csv','popMsg':'CSV','acl':'user'},
      {'title': 'D3','link':'/d3','popMsg':'D3','acl':'user'},
      {'title': 'Poll','link':'/poll','popMsg':'Poll','acl':'user'},
      {'title': 'ElasticSearch','link':'/elastic','popMsg':'Elastic Search','acl':'user'},
      {'title': 'Dashboard','link':'/dashboard','popMsg':'Dashboard','acl':'user'},
      {'title': 'Chat','link':'/chat','popMsg':'Chat','acl':'user'},
      {'title': 'VideoChat','link':'/videochat','popMsg':'Video Chat','acl':'user'},
      {'title': 'Phones','link':'/phones','popMsg':'Phones','acl':'user'},
      {'title': 'Speak','link':'/speak','popMsg':'Speak','acl':'user'},
      {'title': 'Scroll','link':'/scroll','popMsg':'Scroll','acl':'user'},
      {'title': 'Forms','link':'/forms','popMsg':'Forms','acl':'user'},
      {'title': 'Cart','link':'/cart','popMsg':'Cart','acl':'user'},
      {'title': 'Checkout','link':'/checkout','popMsg':'Checkout','acl':'user'}
      ];
    $scope.loggedinMenu       = [
      {'title': 'Checkout','link':'/checkout','popMsg':'Application Repository','acl':'loggeduser'}
     ]; 
    $scope.SuperloggedinMenu  = [
      {'title': 'Tabs','link':'/tabs','popMsg':'Tabs','acl':'user'},
      {'title': 'Template','link':'/template','popMsg':'Template','acl':'user'},
      {'title': 'Monad','link':'/monad','popMsg':'Monad','acl':'user'},
      {'title': 'Polymer','link':'/polymer','popMsg':'Polymer','acl':'user'},
      {'title': 'React','link':'/react','popMsg':'React','acl':'user'},
      // {'title': 'Upload','link':'/upload','popMsg':'Upload','acl':'user'}
     ]; 

    $scope.isCollapsed    = true;
    $scope.isLoggedIn     = Auth.isLoggedIn;
    $scope.isAdmin        = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isSuper        = Auth.isSuper;

    $scope.check_access   = function(){
      if($scope.accessToRoute == ''){
        $scope.resource.forEach(function(res){
          $scope.accessControl(res,Auth.getCurrentUser().email);
        });
      }
     };
    $scope.logout         = function() {
      Auth.logout();
      $location.path('/login');
     };
    $scope.isActive       = function(route) {
      return route === $location.path();
     };
  
  });