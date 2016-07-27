'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var contactFieldCtrlStub = {
  index: 'contactfieldCtrl.index'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var contactFieldIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './contactfield.controller': contactFieldCtrlStub
});

describe('ContactField API Router:', function() {

  it('should return an express router instance', function() {
    expect(contactFieldIndex).to.equal(routerStub);
  });

  describe('GET /api/f9/contactfields', function() {

    it('should route to contactfield.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'contactfieldCtrl.index')
        ).to.have.been.calledOnce;
    });
  });
});
