'use strict';

describe('Directive: uiDivider1', function () {

  // load the directive's module and view
  beforeEach(module('finapp'));
  beforeEach(module('app/directive/uidir/ui-divider-1/ui-divider-1.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ui-divider-1></ui-divider-1>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the uiDivider1 directive');
  }));
});