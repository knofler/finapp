'use strict';

describe('Directive: custdir', function () {

  // load the directive's module and view
  beforeEach(module('finapp'));
  beforeEach(module('app/custdir/custdir.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<custdir></custdir>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the custdir directive');
  }));
});