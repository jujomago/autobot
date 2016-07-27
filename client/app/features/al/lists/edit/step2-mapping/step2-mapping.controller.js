'use strict';
(() => {

    function _csvToJSON(rawFile, delimiter) {
        let delimiterSympol = delimiter || ',';

        let lines = rawFile.trim().split('\n');

        let jsonCSV = lines.map(el => {
            let rowValues = el.split(delimiterSympol);
            return rowValues.map(rv => rv.trim());
        });
        return jsonCSV;
    }

    function _formatGroupedKeyRows(rowsGrouped) {

        let fieldsName = Object.keys(rowsGrouped);
        //console.log('unzip')
        // console.log(_.unzip(rowsGrouped));

        let numRecords = rowsGrouped[fieldsName[0]].length;
        let rowsUnGrouped = [];

        for (var i = 0; i < numRecords; i++) {
            let temObj = {};
            for (var k = 0; k < fieldsName.length; k++) {
                var fieldName = fieldsName[k];
                temObj[fieldName] = rowsGrouped[fieldName][i];
            }
            rowsUnGrouped.push(temObj);
        }
        return rowsUnGrouped;
    }

    function _getRowsData(hasHeader, contactFields, jsonCSV) {
        let resultGroupedRows = {};
        let headersCSV;
        if (hasHeader === true) {
            headersCSV = jsonCSV[0]; // first row is for headers
            jsonCSV.shift(); //delete the header for just work with data
        }

        contactFields.forEach((el) => {
            if (hasHeader) {
                if (el.mappedName !== null) {
                    console.log('valid mappedName for:' + el);
                    let indexFieldHeader = headersCSV.indexOf(el.mappedName);
                    resultGroupedRows[el.name] = jsonCSV.map((elem) => elem[indexFieldHeader]);
                }
            } else {
                if (el.mappedIndex !== 0) {
                    console.log('valid mappedIndex for:' + el);
                    el.mappedIndex--;
                    resultGroupedRows[el.name] = jsonCSV.map((elem) => elem[el.mappedIndex]);
                }
            }
        });

        console.log('getRowsData:================');
        console.log(resultGroupedRows);
        if (Object.keys(resultGroupedRows).length > 0) {
            return _formatGroupedKeyRows(resultGroupedRows);
        } else {
            return resultGroupedRows;
        }
    }


    let _$window, _$stateParams;
    let _ContactFieldsService, _;


    class MapFieldsController {
        constructor($stateParams, $window, ContactFieldsService, lodash) {

            _ = lodash;
            _$stateParams = $stateParams;
            _$window = $window;
            _ContactFieldsService = ContactFieldsService;

            this.hasHeader = true;
            this.delimiters = [
                { title: 'Comma', symbol: ',' },
                { title: 'Colon', symbol: ':' },
                { title: 'SemiColon', symbol: ';' },
                { title: 'Custom' }
            ];

            this.selectedDelimiter = this.delimiters[0];
            this.selectedSymbolDelimiter = '';

            this.customDelimiterEnabled = false;

            this.contactFields = [];

            this.message = { show: false };
            this.loadingContacts = true;

            if (_$stateParams.settings && _$stateParams.settings.csvData) {
                this.canMapping = true;
                this.rawCSV = _$stateParams.settings.csvData;
                this.jsonCSV = _csvToJSON(this.rawCSV);
                this.maxIndexFields = this.jsonCSV[0].length;
                this.getContactFiels();
            } else {
                this.canMapping = false;
                this.message = { show: true, type: 'warning', text: 'no csv file arrived' };
            }

        }
        $onInit() {
            this.changeHeaderValue();
            this.changeDelimiter();
        }
        showState() {
            console.log('state array');
            console.log(this.contactFields);
        }
        initArrays() {
            // TODO: Research _.fill() does not work;
            console.log('initialized arrays');
            if (this.contactFields) {
                _.forEach(this.contactFields, (el) => {
                    el.mappedName = null;
                    el.mappedIndex = 0;
                    if (el.name === 'number1') {
                        el.isKey = true;
                    } else {
                        el.isKey = false;
                    }
                });
            }
        }

        getContactFiels() {
            return _ContactFieldsService.getContactFields()
                .then(response => {
                    if (response.statusCode === 200) {
                        this.contactFields = response.data.filter(e => (e.mapTo === 'None'));
                        this.initArrays();

                        this.loadingContacts = false;
                    } else {
                        this.message = { show: true, type: 'warning', text: response.errorMessage };
                    }
                    return response;
                })
                .catch(e => {
                    this.message = { show: true, type: 'warning', text: e };
                    return e;
                });
        }
        changeHeaderValue() {
            if (this.hasHeader === false) {
                this.clearMapping();
            }
        }

        aplyDemiliterCSV(delimiter) {
            if (this.rawCSV) {
                this.jsonCSV = _csvToJSON(this.rawCSV, delimiter);
                console.log(this.jsonCSV);
            }
        }

        changeDelimiter() {
            if (this.selectedDelimiter.title === 'Custom') {
                this.customDelimiterEnabled = true;
                this.aplyDemiliterCSV(this.selectedSymbolDelimiter);
            } else {
                this.customDelimiterEnabled = false;
                this.aplyDemiliterCSV(this.selectedDelimiter.symbol);
            }
        }

        matchSmart() {

            if (this.hasHeader === true) {
                this.changeDelimiter();
                let posibleHeaders = this.jsonCSV[0];
                console.log(`posibleHeaders:  ${posibleHeaders} `);
                _.forEach(this.contactFields, el => {
                    if (posibleHeaders.indexOf(el.name) >= 0) {
                        el.mappedName = el.name;
                    }
                });
            } else {
                console.log('the feature smart match is just for header enabled');
            }
        }


        clearMapping() {
            // TODO: Research _.fill() does not work;
            if (this.contactFields) {
                this.contactFields.forEach((el) => {
                    el.mappedName = null;
                    el.mappedIndex = 0;
                });
            }
        }

        getHeadersforTable() {
            let headerFieldsforTAble = [];
            if (this.hasHeader === true) {
                headerFieldsforTAble = _.filter(this.contactFields, e => (e.mappedName !== null));
            } else {
                headerFieldsforTAble = _.filter(this.contactFields, e => (e.mappedIndex !== 0));
            }
            return headerFieldsforTAble;
        }

        finishMap() {
            if (this.validateMappingKeyFields()) {

                let contactKeys = _.filter(this.contactFields, { isKey: true });
                let keyNames = _.map(contactKeys, 'name');

                console.log('after validation');
                console.log(keyNames);

                let dataToSend = {
                    listUpdateSettings: _$stateParams.settings.listUpdateSettings,
                    resultMapping: {
                        keys: keyNames,
                        rows: _getRowsData(this.hasHeader, this.contactFields, this.jsonCSV),
                        headerFields: this.getHeadersforTable()
                    }
                };
                // this data goes to table (next step)
                console.log('=== DATA FOR NEXT STEP===');
                console.log(dataToSend);
            }
        }

        validateMappingKeyFields() {
            let keysNotMapped = [];

            if (this.hasHeader) {
                keysNotMapped = _.filter(this.contactFields, { mappedName: null, isKey: true });
            } else {
                keysNotMapped = _.filter(this.contactFields, { mappedIndex: 0, isKey: true });
            }

            let keyNames = _.map(keysNotMapped, 'name');
            if (keysNotMapped.length > 0) {
                _$window.alert(`Contact Fiedls \"${keyNames}\" are marked as keys but has no mapped source field/index`);
            }

            if (keysNotMapped.length > 0) {
                return false;
            }
            return true;
        }
    }

    MapFieldsController.$inject = ['$stateParams', '$window', 'ContactFieldsService', 'lodash'];

    angular.module('fakiyaMainApp')
        .component('al.lists.mapping', {
            templateUrl: 'app/features/al/lists/edit/step2-mapping/step2-mapping.html',
            controller: MapFieldsController
        });

})();
