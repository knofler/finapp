'use strict';

describe('Directive: videoChat', function () {

  // load the directive's module and view
  beforeEach(module('finapp'));
  beforeEach(module('app/directive/video-chat/video-chat.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<video-chat></video-chat>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the videoChat directive');
  }));
});