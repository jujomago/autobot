(function () {
  'use strict';

  function EditListActionsService(lodash) {

    const MODE_ACTION = {
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
      DEFAULT_SETTINGS = {
       UPDATE: {
          isCrmUpdate: true,
          listAddMode: MODE_ACTION.LIST.ADD_FIRST,
          crmAddMode: MODE_ACTION.CRM.ADD_NEW,
          crmUpdateMode: MODE_ACTION.CRM.UPDATE_FIRST,
          cleanListBeforeUpdate: false
        },
        DELETE: {
          listDeleteMode: MODE_ACTION.LIST.DELETE_ALL
        }
      },
      DEFAULT_KEY = 'number1',
      MESSAGE_SETTINGS = {
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
      },
      LABELS_SETTINGS = {
        UPDATE: {
          title: 'List update',
          description: 'Select how would you like to update the list',
          titleOptions: 'Action for list update'
        },
        DELETE: {
          title: 'List Remove',
          description: 'Select how would you like to remove your list ',
          titleOptions: 'Action for list remove'
        }
      };

    //Default key to Contact Field
    function loadDefaultKey(contactFields) {
      return lodash.filter(contactFields, function (value) {
        value.isKey = value.name === DEFAULT_KEY;
        return value.mapTo === 'None';
      });
    }

    //before send Upload
    function getMappingFields(contactFields) {
      let mappingFields = [];

      lodash.forEach(contactFields, (value, index) => (mappingFields.push({
        columnNumber: index + 1,
        fieldName: value.name,
        key: value.isKey
      })));

      return mappingFields;
    }

    function getFieldsKey(contactFields) {
      return lodash.filter(contactFields, value => (value.isKey));
    }

    function getConstantsUpdate() {
      return MODE_ACTION;
    }

    function getDefaultSetting(isUpdate) {
      let setting = isUpdate ? DEFAULT_SETTINGS.UPDATE : DEFAULT_SETTINGS.DELETE;
      return lodash.clone(setting);
    }

    function getSettingMessage() {
      return MESSAGE_SETTINGS;
    }

    function getSettingsUpdate(settings) {
      let settingFormat = {};

      settingFormat.cleanListBeforeUpdate = settings.cleanListBeforeUpdate;
      settingFormat.listAddMode = settings.listAddMode;
      settingFormat.crmAddMode = settings.crmAddMode;
      settingFormat.crmUpdateMode = settings.isCrmUpdate ? settings.crmUpdateMode : MODE_ACTION.CRM.DONT_UPDATE;

      return settingFormat;
    }

    function getLabelsSettings(isUpdate) {
      return isUpdate ? LABELS_SETTINGS.UPDATE : LABELS_SETTINGS.DELETE;
    }

    return {
      loadDefaultKey: loadDefaultKey,
      getConstantsUpdate: getConstantsUpdate,
      getDefaultSetting: getDefaultSetting,
      getFieldsKey: getFieldsKey,
      getMappingFields: getMappingFields,
      getSettingsUpdate: getSettingsUpdate,
      getSettingMessage: getSettingMessage,
      getLabelsSettings: getLabelsSettings
    };
  }

  EditListActionsService.$inject = ['lodash'];

  angular.module('fakiyaMainApp').
  factory('EditListActions',EditListActionsService);

})();
