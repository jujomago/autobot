'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var campaignProfileCtrlStub = {
  index: 'campaignProfileCtrl.index',
  destroy: 'campaignProfileCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var campaignProfileIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './campaignProfile.controller': campaignProfileCtrlStub
});

describe('CampaignProfile API Router:', function() {

  it('should return an express router instance', function() {
    expect(campaignProfileIndex).to.equal(routerStub);
  });

  describe('GET /api/campaignProfiles', function() {

    it('should route to campaignProfile.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'campaignProfileCtrl.index')
        ).to.have.been.calledOnce;
    });

    it('should route to campaignProfile.controller.destroy', function() {
      expect(routerStub.get
        .withArgs('/:profileName', 'campaignProfileCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
