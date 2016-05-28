'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var campaignCtrlStub = {
  index: 'campaignCtrl.index',
  show: 'campaignCtrl.show',
  create: 'campaignCtrl.create',
  ivrscripts : 'campaignCtrl.ivrscripts',
  getLists : 'campaignCtrl.getLists',
  getDNISList : 'campaignCtrl.getDNISList',
  startCampaign: 'campaignCtrl.startCampaign',
  stopCampaign: 'campaignCtrl.stopCampaign',
  updateOutBound: 'campaignCtrl.updateOutBound',
  updateInBound: 'campaignCtrl.updateInBound',
  updateAutoDial: 'campaignCtrl.updateAutoDial',
  destroy: 'campaignCtrl.destroy',
  addDNIS: 'campaignCtrl.addDNIS',
  addLists: 'campaignCtrl.addLists'

};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var campaignIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './campaign.controller': campaignCtrlStub
});

describe('Campaign API Router:', function() {

  it('should return an express router instance', function() {
    expect(campaignIndex).to.equal(routerStub);
  });

  describe('GET /api/f9/campaigns', function() {

    it('should route to campaign.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'campaignCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/f9/campaigns/show/:type/:campaignName', function() {

    it('should route to campaign.controller.show', function() {
      expect(routerStub.get
        .withArgs('/show/:type/:campaignName', 'campaignCtrl.show')
        ).to.have.been.calledOnce;
    });
  });
  
  

  describe('GET /api/f9/campaigns/start/:campaignName', function() {

    it('should route to campaign.controller.startCampaign', function() {
      expect(routerStub.get
        .withArgs('/start/:campaignName', 'campaignCtrl.startCampaign')
        ).to.have.been.calledOnce;
    });

  });
  
  
    describe('GET /api/f9/campaigns/stop/:campaignName', function() {

    it('should route to campaign.controller.stopCampaign', function() {
      expect(routerStub.get
        .withArgs('/stop/:campaignName', 'campaignCtrl.stopCampaign')
        ).to.have.been.calledOnce;
    });

  });
  
  
  describe('GET /api/f9/campaigns/ivrscripts', function() {
    it('should route to campaign.controller.ivrscripts', function() {
      expect(routerStub.get
        .withArgs('/ivrscripts', 'campaignCtrl.ivrscripts')
        ).to.have.been.calledOnce;
    });
  });
  
  describe('GET /api/f9/campaigns/lists', function() {

    it('should route to campaign.controller.getLists', function() {
      expect(routerStub.get
        .withArgs('/lists', 'campaignCtrl.getLists')
        ).to.have.been.calledOnce;
    });
  });
  
  describe('GET /api/f9/campaigns/dnis', function() {

    it('should route to campaign.controller.getDNISList', function() {
      expect(routerStub.get
        .withArgs('/dnis', 'campaignCtrl.getDNISList')
        ).to.have.been.calledOnce;
    });
  });


  describe('POST /api/f9/campaigns', function() {
    it('should route to campaign.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'campaignCtrl.create')
        ).to.have.been.calledOnce;
    });
  });
  
  describe('POST /api/f9/campaigns/add/dnis', function() {
    it('should route to campaign.controller.addDNIS', function() {
      expect(routerStub.post
        .withArgs('/add/dnis', 'campaignCtrl.addDNIS')
        ).to.have.been.calledOnce;
    });
  });
  
  
  describe('POST /api/f9/campaigns/add/lists', function() {
    it('should route to campaign.controller.addLists', function() {
      expect(routerStub.post
        .withArgs('/add/lists', 'campaignCtrl.addLists')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/f9/campaigns/outbound', function() {
    it('should route to campaign.controller.updateOutBound', function() {
      expect(routerStub.put
        .withArgs('/outbound', 'campaignCtrl.updateOutBound')
        ).to.have.been.calledOnce;
    });
  });
  
    describe('PUT /api/f9/campaigns/autodial', function() {
    it('should route to campaign.controller.updateAutoDial', function() {
      expect(routerStub.put
        .withArgs('/autodial', 'campaignCtrl.updateAutoDial')
        ).to.have.been.calledOnce;
    });
  });
    describe('PUT /api/f9/campaigns/inbound', function() {
    it('should route to campaign.controller.updateInBound', function() {
      expect(routerStub.put
        .withArgs('/inbound', 'campaignCtrl.updateInBound')
        ).to.have.been.calledOnce;
    });
  });


  describe('DELETE /api/f9/campaigns/:campaignName', function() {
    it('should route to campaign.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:campaignName', 'campaignCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
