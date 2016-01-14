'use strict';

describe('Directive: elasticSearch', function () {

  // load the directive's module and view
  beforeEach(module('finapp'));
  beforeEach(module('app/directive/elastic-search/elastic-search.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<elastic-search></elastic-search>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the elasticSearch directive');
  }));
});