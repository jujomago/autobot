'use strict';
(() => {

    let  _$stateParams,_$state;
    let _AlertMessage, _ContactFieldsService, _;

    function _csvToJSON(rawFile, delimiter) {
        let delimiterSympol = delimiter;
        let lines = rawFile.trim().split('\n');

        let jsonCSV = lines.map(el => {
            let rowValues = el.split(delimiterSympol);
            return rowValues.map(rv => rv.trim());
        });
        return jsonCSV;
    }


    function _validRowNumber(csvObjectRow) {       
        let number;  
        let resultPhones=[];
         for (var prop in csvObjectRow) {
            if (prop === 'number1' || prop === 'number2' || prop === 'number3') {
                let numberPhone = csvObjectRow[prop];
                if (numberPhone.length <= 10) { // phone us number
                    number = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
                } else { // international numbers
                    number = new RegExp(/^(?:\+|00|011)(?:[. ()-]*\d){10,17}[. ()-]*$/g);
                }           
                let boolResult=number.test(numberPhone);
                resultPhones.push(boolResult);             
            }
        }   
        return resultPhones.indexOf(true)>=0;
    }
   
    function _formatGroupedKeyRows(rowsGrouped) {

        let fieldsName = Object.keys(rowsGrouped);
        //console.log('unzip')
        // console.log(_.unzip(rowsGrouped));

        let numRecords = rowsGrouped[fieldsName[0]].length;
        let rowsUnGrouped = [];
        let invalidRows = [];

        for (var i = 0; i < numRecords; i++) {
            let tempObj = {};
            for (var k = 0; k < fieldsName.length; k++) {
                var fieldName = fieldsName[k];
                tempObj[fieldName] = rowsGrouped[fieldName][i];
            }
            if (_validRowNumber(tempObj) &&  (
                 tempObj.hasOwnProperty('number1') ||
                 tempObj.hasOwnProperty('number2') ||
                 tempObj.hasOwnProperty('number3')  
                )){             
                rowsUnGrouped.push(tempObj);
            } else {
                let errorField = JSON.stringify(tempObj).replace(/"/g, '');
                invalidRows.push({ line: i + 1, record: errorField });                
            }
        }

        let contentModal={
            title:'Summary'
        };

        if(invalidRows.length===0){
            contentModal.body=`All ${numRecords} record(s) have been successfully read from file. Records will be added to the list`;
         }else{
            contentModal.textCloseBtn='Close';
            contentModal.listDetail={
                    headerList:'Invalid records',
                    cols:['Line','Error'],
                    rows:[]
            };          
            
            if (invalidRows.length === numRecords) {
                contentModal.body=`All ${numRecords} record(s) are invalids, try again`;
                contentModal.customFunction=function(){
                     _$state.go('ap.al.lists');
                };   
            }else{               
                contentModal.body=`Only ${rowsUnGrouped.length} of ${numRecords} records have been successfully read from file. ${rowsUnGrouped.length} valid Record(s) will be added to the list`;     
            }  
            let fe = '';
            for (var r = 0; r < invalidRows.length; r++) {
                contentModal.listDetail.rows.push({'line':invalidRows[r].line,'error':'Record Number is not valid'});
                fe += JSON.stringify(invalidRows[r]).replace(/"/g, '') + '\n';
            }
           
        }
        _AlertMessage(contentModal);

       return rowsUnGrouped;
    }
    
    function _checkSelectedFieldKeys(hasHeader, contactFields, lodash) {
        let keysNotMapped = [];
        let _ = lodash;

        let allKeysFields = _.filter(contactFields,{'isKey':true});
        let allRepeatedKeyFields=_.filter(contactFields,el=>{
               let idxFound=_.findIndex(allKeysFields, {'name':el.name});
               return idxFound>=0;              
        });
        
        if (hasHeader) {
            keysNotMapped = _.chain(allRepeatedKeyFields).filter({'mappedName':null}).uniq('name').value();
        } else {
            keysNotMapped = _.chain(allRepeatedKeyFields).filter({'mappedIndex':0}).uniq('name').value();
        }

        return keysNotMapped;
    }

    function _getMappedFiels(hasHeader, contactFields, uniq ,lodash) {
        let headerFieldsforTAble = [];
        let _ = lodash;
    

        if (hasHeader === true) {
            if(uniq==='uniq'){
                headerFieldsforTAble = _.chain(contactFields)
                                  .reject({'mappedName':null})
                                  .uniq('name').value();
            }else{
                headerFieldsforTAble = _.reject(contactFields,{'mappedName':null});                 
            }                                 
        } else {
             if(uniq==='uniq'){
                headerFieldsforTAble = _.chain(contactFields)
                                  .reject({'mappedIndex':0})
                                  .uniq('name').value();
             }else{
                headerFieldsforTAble = _.filter(contactFields,{'mappedIndex':0});
             }
        }

        return headerFieldsforTAble;
    }


    function _getRowsData(hasHeader, contactFields, jsonCSV, lodash) {
        let _ = lodash;
        let resultGroupedRows = {};
        let headersCSV;
        let jsonCSVTemp = jsonCSV.slice();
        if (hasHeader === true) {
            headersCSV = jsonCSV[0]; // first row is for headers
            jsonCSVTemp.shift(); //delete the header for just work with data
        }

    //    console.log('attackin json');
    //    console.log(jsonCSV);

        let mappedFiedls = _getMappedFiels(hasHeader, contactFields, 'uniq', _);

        _.each(mappedFiedls,el=>{
            let typeField=el.type;
            let mappedSourcesByFieldName=_.filter(contactFields,{'name':el.name});

            if (hasHeader) {   
                let mappedFieldsNames=_.map(mappedSourcesByFieldName,'mappedName');
                let mappedFiedlsNamesIndexes=_.map(mappedFieldsNames,el=>_.indexOf(headersCSV,el));                              

                resultGroupedRows[el.name] = jsonCSVTemp.map(elem => {
                        if(typeField==='PHONE'){
                            return _.chain(mappedFiedlsNamesIndexes)
                                    .map(ind=>{                                       
                                         return elem[ind].replace(/[^\d]/g, '');  // clean all non numbers characters                                         
                                    }).join('').value();

                        }else{
                            return _.chain(mappedFiedlsNamesIndexes)
                                   .map(ind=>elem[ind]).join(' ').value();
                        }
                });
                
            } else {
                let mappedFiedlsIndexes=_.map(mappedSourcesByFieldName,'mappedIndex');

                resultGroupedRows[el.name] = jsonCSV.map(elem => {
                     if(typeField==='PHONE'){
                         return _.chain(mappedFiedlsIndexes)
                                    .map(ind=>{
                                           return  elem[ind-1].replace(/[^\d]/g, '');  // clean all non numbers characters                              
                                    }).join('').value();
                     }else{
                        return _.chain(mappedFiedlsIndexes)
                               .map(ind=>elem[ind-1])
                               .join(' ').value();                  
                     }
                });

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


    function _getFieldsEntries(hasHeader, contactFields, jsonCSV, lodash) {
        let fieldsEntries = [];
        let mappedFiedls = _getMappedFiels(hasHeader, contactFields, 'uniq' ,lodash);
        let _ = lodash;

        fieldsEntries = _.map(mappedFiedls, el => {
            let cn;
            if (hasHeader) {
                cn = jsonCSV[0].indexOf(el.mappedName) + 1;
            } else {
                cn = el.mappedIndex;
            }
            let fieldEntry = {
                fieldName: el.name,
                key: el.isKey,
                columnNumber: cn
            };
            return fieldEntry;
        });

        return fieldsEntries;
    }






    class MapFieldsController {

        constructor($stateParams, AlertMessage, $state, ContactFieldsService, lodash) {
            _ = lodash;
            _$stateParams = $stateParams;
            _AlertMessage = AlertMessage;
            _$state = $state;
            _ContactFieldsService = ContactFieldsService;
            this.hasHeader = true;
            this.delimiters = [
                { title: 'Comma', symbol: ',' },
                { title: 'Colon', symbol: ':' },
                { title: 'SemiColon', symbol: ';' },
                { title: 'Custom' }
            ];

            this.selectedDelimiter = this.delimiters[0];
            this.customDelimiterDefaultSymbol=','; 
            this.customDelimiterEnabled = false;
            this.contactFields = [];          

            this.message = { show: false };
            this.loadingContacts = true;
            this.canMapping = false;
            this.selectedRow=-1;
            this.jsonCSV=[];
        }

        $onInit() {
            this.changeHeaderValue();         
            this.setStateParams(_$stateParams);
            this.changeDelimiter();
        }

        setStateParams(stateParams){
            if (stateParams.manual === true) {             
                this.getContactFiels();
                this.listName = stateParams.name;
            } else {              
                if (stateParams.settings && stateParams.settings.csvData) {
                    this.canMapping = true;
                    this.rawCSV = stateParams.settings.csvData;
                    this.jsonCSV = _csvToJSON(this.rawCSV);                  
                    this.getContactFiels();
                    this.listName = stateParams.name;
                } else {
                    this.message = { show: true, type: 'warning', text: 'no csv file arrived' };
                }
            }
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
                this.contactFieldsNames = _.map(this.contactFields, el => {
                    return _.omit(el, ['isKey']);
                });

                this.contactFieldSelectedName = this.contactFieldsNames[0];
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
                delimiter = delimiter || '\n';
                this.jsonCSV = _csvToJSON(this.rawCSV, delimiter);         
                console.log(this.jsonCSV); 
            }
        }

        changeDelimiter() {
             this.customDelimiterEnabled = (this.selectedDelimiter.title === 'Custom');
             if(this.customDelimiterEnabled){
                  this.aplyDemiliterCSV(this.customDelimiterDefaultSymbol);
             }else{
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

        nextStep(){
            console.log('next Step');
            console.log(this.contactFields);
            let keysCount = _.filter(this.contactFields,{'isKey': true}).length;
            if(keysCount>0 && keysCount<13){
                let dataToSend = {
                        fields: this.contactFields
                };

                if (_$stateParams.settings.listDeleteSettings) {
                    dataToSend.listDeleteSettings = _$stateParams.settings.listDeleteSettings;
                } else {
                    dataToSend.listUpdateSettings = _$stateParams.settings.listUpdateSettings;
                }

                _$state.go('ap.al.listsEdit-list', {settings:dataToSend, name: _$stateParams.name, manual: true});  
            }
            else{
                let messageText;
                if(keysCount===0){
                    messageText = 'At least one field must be marked as key';
                }
                else{
                    messageText = 'No more than 12 fields can be marked as key';
                }
                this.message = {type: 'warning', show: true, text: messageText, expires: 5000};
            }  
        }

        finishMap() {

            let fieldsKeys = _.filter(this.contactFields,{'isKey':true});
            let checkSelectedKeys = _checkSelectedFieldKeys(this.hasHeader, this.contactFields, _);
           
            if(fieldsKeys.length>0){
                if (checkSelectedKeys.length === 0) {
                    let keyNames = _.chain(this.contactFields)
                                        .filter({isKey:true})
                                        .map('name').value();
                    let dataToSend = {
                        resultMapping: {
                            keys: keyNames,
                            rows: _getRowsData(this.hasHeader, this.contactFields, this.jsonCSV, _),
                            headerFields: _getMappedFiels(this.hasHeader, this.contactFields, 'uniq', _)

                        },
                        fieldsMapping: _getFieldsEntries(this.hasHeader, this.contactFields, this.jsonCSV, _)
                    };

                    if (_$stateParams.settings.listDeleteSettings) {
                        dataToSend.listDeleteSettings = _$stateParams.settings.listDeleteSettings;
                    } else {
                        dataToSend.listUpdateSettings = _$stateParams.settings.listUpdateSettings;
                    }
                

                    // this data goes to table (next step)
                    console.log('=== DATA FOR NEXT STEPP===');
                    console.log(dataToSend);

                    _$state.go('ap.al.listsEdit-list', { settings: dataToSend, name: _$stateParams.name });
                    return dataToSend;
                } else {
                    let keyNamesNotMapped = _.map(checkSelectedKeys, 'name');
                    this.message = { show: true, type: 'warning', text: `Contact Fields \"${keyNamesNotMapped.join(' , ')}\" are marked as keys but has no mapped source field/index`, expires: 8000 };
                    return null;
                }
            }else{                 
                let noneMapped;
                if(this.hasHeader){
                    noneMapped=_.reject(this.contactFields,{'mappedName':null});
                }else{
                    noneMapped=_.reject(this.contactFields,{'mappedIndex':0});
                }

                if(noneMapped.length!==0){
                    this.message.text= 'At least one field must be marked as key';                      
                }else{
                    this.message.text= 'At least one source fields should be mapped to Contact Field';                      
                }

                this.message.show=true;
                this.message.type='warning';
                this.message.expires=8000;                    
                
                return null;
            }
        }

        addMappingItem() {
            console.log(`selected item ${angular.toJson(this.contactFieldSelectedName)}`);

            let clonedItem = angular.copy(this.contactFieldSelectedName);

            let idx = _.findIndex(this.contactFields, { 'name': this.contactFieldSelectedName.name });
            if (idx >= 0) {
                                
                this.contactFields.splice((idx + 1), 0, clonedItem);                
            } else {
                console.log('not found field, inserted first');
                clonedItem.isKey=false;
                this.contactFields.unshift(clonedItem);
                // push first
            }
            console.log(`the index found is ${idx}`);
            return idx;         
        }
        
        removeSelectedItem() {
            console.log(this.contactFields);
            console.log(`the selected row is ${this.selectedRow}`);
            console.log('goint to delete');
            let goingToDelete=this.contactFields[this.selectedRow];

            if(goingToDelete && goingToDelete.hasOwnProperty('isKey')){
                let posibleNext=this.selectedRow+1;
                 if(this.contactFields[posibleNext]){
                    let nameNext=this.contactFields[posibleNext].name;
                    let nameCurrent=goingToDelete.name;
                    if(nameCurrent===nameNext){
                        this.contactFields[posibleNext].isKey=false;
                   }
                }
                this.contactFields.splice(this.selectedRow, 1);
                this.selectedRow=-1;
                return true;
            }else{
                if (goingToDelete) {
                    this.contactFields.splice(this.selectedRow, 1);
                    this.selectedRow=-1;
                    return true;
                } else {
                    return false;
                }
            }          
        }
    }

    MapFieldsController.$inject = ['$stateParams', 'AlertMessage', '$state', 'ContactFieldsService', 'lodash'];

    angular.module('fakiyaMainApp')
        .component('al.lists.mapping', {
            templateUrl:['$element','$attrs', function ($element, $attrs) {
                let manual = JSON.parse($attrs.manual);
                if (manual) {
                    return 'app/features/al/lists/edit/step2-mapping/step2-keys.html';
                } else {
                    return 'app/features/al/lists/edit/step2-mapping/step2-mapping.html';
                }
            }],
            controller: MapFieldsController
        });

})();
