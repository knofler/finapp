'use strict';

describe('Service: datas', function () {

  // load the service's module
  beforeEach(module('finapp'));

  // instantiate service
  var datas;
  beforeEach(inject(function (_datas_) {
    datas = _datas_;
  }));

  it('should do something', function () {
    expect(!!datas).toBe(true);
  });

});
