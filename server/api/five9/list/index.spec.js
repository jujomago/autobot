'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var listCtrlStub = {
  index: 'listCtrl.index',
  show: 'listCtrl.show',
  create: 'listCtrl.create',
  update: 'listCtrl.update',
  destroy: 'listCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var listIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './list.controller': listCtrlStub
});

describe('List API Router:', function() {

  it('should return an express router instance', function() {
    expect(listIndex).to.equal(routerStub);
  });

  describe('GET /api/f9/lists', function() {

    it('should route to list.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'listCtrl.index')
        ).to.have.been.calledOnce;
    });

  });
  describe('DELETE /api/f9/lists/:listName', function() {

    it('should route to list.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:listName', 'listCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
