'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var dispositionCtrlStub = {
  index: 'dispositionCtrl.index',
  show: 'dispositionCtrl.show',
  create: 'dispositionCtrl.create',
  update: 'dispositionCtrl.update',
  destroy: 'dispositionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var dispositionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './disposition.controller': dispositionCtrlStub
});

describe('Disposition API Router:', function() {

  it('should return an express router instance', function() {
    expect(dispositionIndex).to.equal(routerStub);
  });

  describe('GET /api/dispositions', function() {

    it('should route to disposition.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'dispositionCtrl.index')
        ).to.have.been.calledOnce;
    });

  });
  describe('DELETE /api/dispositions/:dispositionName', function() {

    it('should route to disposition.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:dispositionName', 'dispositionCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
