'use strict';

describe('Directive: uiFooters', function () {

  // load the directive's module and view
  beforeEach(module('finapp'));
  beforeEach(module('app/directive/uidir/ui-footers/ui-footers.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ui-footers></ui-footers>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the uiFooters directive');
  }));
});