'use strict';

describe('Directive: remoteDesktop', function () {

  // load the directive's module and view
  beforeEach(module('finapp'));
  beforeEach(module('app/directive/remote-desktop/remote-desktop.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<remote-desktop></remote-desktop>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the remoteDesktop directive');
  }));
});