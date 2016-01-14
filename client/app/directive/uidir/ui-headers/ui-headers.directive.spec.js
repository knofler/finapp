'use strict';

describe('Directive: uiHeaders', function () {

  // load the directive's module and view
  beforeEach(module('finapp'));
  beforeEach(module('app/directive/uidir/ui-headers/ui-headers.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ui-headers></ui-headers>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the uiHeaders directive');
  }));
});