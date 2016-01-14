'use strict';

describe('Directive: uiSummary', function () {

  // load the directive's module and view
  beforeEach(module('finapp'));
  beforeEach(module('app/directive/uidir/ui-summary/ui-summary.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ui-summary></ui-summary>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the uiSummary directive');
  }));
});