'use strict';

describe('Service:PromptDialog', function () {
  let mockModal;
  // load the service's module
  beforeEach(module('fakiyaMainApp'));
  beforeEach(function (){
      mockModal = {
        open: function(result){
          return {result: result};
        }
      };
      module(function ($provide){
          $provide.value('ModalManager', mockModal);
      });
  });

  // instantiate service
  var PromptDialog;
  beforeEach(inject(function (_PromptDialog_) {
    PromptDialog = _PromptDialog_;
  }));

  it('should return prompt config', function () {
    let result = PromptDialog.open({title: 'title', body: 'body'}, {align: 'center'});
    expect(result.resolve.content()).to.be.deep.equal({title: 'title', body: 'body'});
    expect(result.resolve.config()).to.be.deep.equal({align: 'center'});
  });

});
