'use strict';

describe('Service:UtilsList', function () {
  let UtilsList,
      CONTACT_FIELDS,
      MODE_UPDATE,
      UPDATE_SETTING_DEFAULT,
      UPDATE_SETTINGS_BY_USER;

  beforeEach(module('fakiyaMainApp'));

  beforeEach(inject(function (
    _UtilsList_
  ) {
    UtilsList = _UtilsList_;
    MODE_UPDATE = {
      CRM: {
        ADD_NEW: 'ADD_NEW',
        DONT_ADD: 'DONT_ADD',
        UPDATE_FIRST: 'UPDATE_FIRST',
        UPDATE_ALL: 'UPDATE_ALL',
        UPDATE_SOLE_MATCHES: 'UPDATE_SOLE_MATCHES',
        DONT_UPDATE: 'DONT_UPDATE'
      },
      LIST: {
        ADD_FIRST: 'ADD_FIRST',
        ADD_ALL: 'ADD_ALL',
        ADD_IF_SOLE_CRM_MATCH: 'ADD_IF_SOLE_CRM_MATCH',
        DELETE_ALL: 'DELETE_ALL',
        DELETE_EXCEPT_FIRST: 'DELETE_EXCEPT_FIRST'
      }
    },
      UPDATE_SETTING_DEFAULT = {
        listAddMode: 'ADD_FIRST',
        crmAddMode: 'ADD_NEW',
        crmUpdateMode: 'UPDATE_FIRST',
        cleanListBeforeUpdate: false
      },
      CONTACT_FIELDS = [
        {
          displayAs: 'Long',
          mapTo: 'None',
          name: 'number1',
          system: true,
          type: 'PHONE'
        },
        {
          displayAs: 'Long',
          mapTo: 'None',
          name: 'number2',
          system: true,
          type: 'PHONE'
        },
        {
          displayAs: 'Long',
          mapTo: 'None',
          name: 'number3',
          system: true,
          type: 'PHONE'
        }],
      UPDATE_SETTINGS_BY_USER = {
        listAddMode: 'ADD_FIRST',
        crmAddMode: 'ADD_NEW',
        crmUpdateMode: 'UPDATE_FIRST',
        cleanListBeforeUpdate: false,
        isCrmUpdate: false
      };
  }));

  describe('#ActionsUtilsList', () => {
    it('should load Default Keys (number1)', function () {
      let result;

      result = UtilsList.loadDefaultKey(CONTACT_FIELDS);

      expect(result[0].isKey).to.be.true;
      expect(result[1].isKey).to.be.false;
      expect(result[2].isKey).to.be.false;
    });

    it('should return default Mode Update', function () {
      expect(UtilsList.getConstantsUpdate()).to.deep.equal(MODE_UPDATE);
    });

    it('should return default Update Settings DEFAULT', function () {
      expect(UtilsList.getDefaultUpdateSetting()).to.deep.equal(UPDATE_SETTING_DEFAULT);
    });

    it('should return only keys', function () {
      expect(UtilsList.getFieldsKey(UtilsList.loadDefaultKey(CONTACT_FIELDS))).to.have.lengthOf(1);
    });

    it('should map contact fields', function () {
      let EXPECT_MAPPING = [
        {
          columnNumber:1,
          fieldName:'number1',
          key:true
        },
        {
          columnNumber:2,
          fieldName:'number2',
          key:false
        },
        {
          columnNumber:3,
          fieldName:'number3',
          key:false
        }
      ];

      expect(UtilsList.getMappingFields(UtilsList.loadDefaultKey(CONTACT_FIELDS))).to.deep.equal(EXPECT_MAPPING);
    });

    it('should return setting Update with format correct', function () {
      let EXPECT_UPDATE_FORMAT = {
        cleanListBeforeUpdate:false,
        listAddMode:'ADD_FIRST',
        crmAddMode:'ADD_NEW',
        crmUpdateMode:'DONT_UPDATE'
      };

      expect(UtilsList.getSettingsUpdate(UPDATE_SETTINGS_BY_USER)).to.deep.equal(EXPECT_UPDATE_FORMAT);
    });

    it('should return options message when all Update Contact is Selected', function () {
      let EXPECT_MESSAGE = {
        message: {
          title: 'Confirm',
          body: 'With these setting the list update procedure will potentially allow the creation of duplicate Contact Records. If you are unsure your list includes duplicate information, it is recommended that you change your import settings. Continue?',
          class: 'description-confirm',
          isCustomClass: true
        },
        buttons: {
          okText: 'Yes',
          cancelText: 'No'
        }
      };

      expect(UtilsList.getSettingMessage()).to.deep.equal(EXPECT_MESSAGE);
    });
  });
});
