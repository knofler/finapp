'use strict';

describe('Directive: uiGreywrap', function () {

  // load the directive's module and view
  beforeEach(module('finapp'));
  beforeEach(module('app/directive/uidir/ui-greywrap/ui-greywrap.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ui-greywrap></ui-greywrap>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the uiGreywrap directive');
  }));
});