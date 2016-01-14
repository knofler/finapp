'use strict';

describe('Directive: uiDivider3', function () {

  // load the directive's module and view
  beforeEach(module('finapp'));
  beforeEach(module('app/directive/uidir/ui-divider-3/ui-divider-3.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ui-divider-3></ui-divider-3>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the uiDivider3 directive');
  }));
});