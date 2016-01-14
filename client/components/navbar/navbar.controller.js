'use strict';

angular.module('finapp')
  .controller('NavbarCtrl', function ($scope, $location,userInfo, Auth) {
    $scope.menu               = [
      // {'title': 'Home','link': '/'},
      {'title': 'Accounting','link':'/accounting','popMsg':'Accounting','acl':'user'},
      {'title': 'Chart','link':'/chart','popMsg':'Chart','acl':'user'},
      {'title': 'CSV','link':'/csv','popMsg':'CSV','acl':'user'},
      {'title': 'D3','link':'/d3','popMsg':'D3','acl':'user'}
      ];
    $scope.loggedinMenu       = [
     ]; 
    $scope.SuperloggedinMenu  = [
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