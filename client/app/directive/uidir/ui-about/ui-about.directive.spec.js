'use strict';

describe('Directive: uiAbout', function () {

  // load the directive's module and view
  beforeEach(module('finapp'));
  beforeEach(module('app/directive/uidir/ui-about/ui-about.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ui-about></ui-about>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the uiAbout directive');
  }));
});