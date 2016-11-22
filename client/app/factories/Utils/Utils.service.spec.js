'use strict';

describe('Service:Utils', function () {
  let Utils;

  beforeEach(module('fakiyaMainApp'));

  beforeEach(inject(function (
    _Utils_
  ) {
    Utils = _Utils_;
  }));

  describe('#ActionsUtils', () => {
    it('should return true/false if value is Null or Undefined', function () {
      let object = {};

      expect(Utils.isUndefinedOrNull(object)).to.be.false;
      expect(Utils.isUndefinedOrNull(object.data)).to.be.true;
    });

    it('should set/get Object', function () {
      let object = {};

      Utils.setDataListAction(object);
      expect(Utils.isUndefinedOrNull(Utils.getDataListAction())).to.be.false;
    });
  });
});
