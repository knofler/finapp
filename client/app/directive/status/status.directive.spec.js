'use strict';

describe('Directive: status', function () {

  // load the directive's module and view
  beforeEach(module('finapp'));
  beforeEach(module('app/directive/status/status.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<status></status>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the status directive');
  }));
});