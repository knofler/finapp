'use strict';

describe('Service: pageCtrlSrv', function () {

  // load the service's module
  beforeEach(module('finapp'));

  // instantiate service
  var pageCtrlSrv;
  beforeEach(inject(function (_pageCtrlSrv_) {
    pageCtrlSrv = _pageCtrlSrv_;
  }));

  it('should do something', function () {
    expect(!!pageCtrlSrv).toBe(true);
  });

});
