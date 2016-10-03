'use strict';
(() => {

    function _csvToJSON(rawFile, delimiter, hasHeaders) {
        console.log(`calling to csvToJson with delimiter ${delimiter} and hasHeaders ${hasHeaders}`);
        let lines = rawFile.trim().split('\n');
        let result = [];      

        if (!hasHeaders) {
            result = lines.map(el => {
                let rowValues = el.split(delimiter);
                return rowValues.map(rv => rv.trim());
            });
        } else {
            let headers = lines[0].split(delimiter).map(e=>e.trim());
            for (var i = 1; i < lines.length; i++) {
                var obj = {};
                var currentline = lines[i].split(delimiter);

                for (var j = 0; j < headers.length; j++) {
                    try{
                        obj[headers[j]] = currentline[j].trim();
                    }catch(e){
                        obj[headers[j]] = currentline[0];
                    }    
                }
                result.push(obj);                             
            }        
        } 
        return result;      
    }

    function _aplyDemiliterCSV(rawCSV,delimiter,hasHeader) {       
        if (rawCSV) {
            delimiter = delimiter || '\n';
            let jsonCSV = _csvToJSON(rawCSV, delimiter, hasHeader);
            return jsonCSV;
        }else{
            console.log('rawCSV is not set');
        }       
    }

    //BUG:1465 - The Contact uploads report does not accept valid numbers of the csv file.     
    function _validateSingleRow(lodash,singleRow,validator,actionList){
      
        let row=singleRow;
        let _ = lodash;


        let resultValidSingleRow=[];
        let resultValidation;

        let allFieldsEmpty=_.every(singleRow,e=>(e===''));
                
        function _fillResultsBools(key,value,result){
            if(!result){
                let errorReason=`Field "${key}" has a invalid value "${value}"`; 
                return {errorReason:errorReason,result:false};
            }else{
                return {result:true};
            }  
        }

        if(allFieldsEmpty && actionList==='update'){
            resultValidSingleRow.push({errorReason:'Record is empty.',result:false});
        }else if(!row.hasOwnProperty('number1') &&  !row.hasOwnProperty('number2') && !row.hasOwnProperty('number3') && actionList==='update'){
            resultValidSingleRow.push({errorReason:'Record must have at least one phone number.',result:false});
        }else{
            //Bug 1465 - Admin Console: Contact upload report:  The Contact uploads report does not accept valid numbers of the csv file.
            if(actionList==='update'){               
                if( 
                ( (row.hasOwnProperty('number1') && row.number1==='') && !row.hasOwnProperty('number2') && !row.hasOwnProperty('number3') ) ||
                ( (row.hasOwnProperty('number2') && row.number2==='') && !row.hasOwnProperty('number1') && !row.hasOwnProperty('number3') ) ||
                ( (row.hasOwnProperty('number3') && row.number3==='') && !row.hasOwnProperty('number1') && !row.hasOwnProperty('number2') )
                ){
                        resultValidSingleRow.push({errorReason:'Record must have at least one phone number.',result:false});
                }           
                if(row.hasOwnProperty('number1') &&  row.hasOwnProperty('number2') && !row.hasOwnProperty('number3')){
                    if(row.number1==='' && row.number2===''){
                        resultValidSingleRow.push({errorReason:'Record must have at least one phone number.',result:false});
                    }                
                }
                if(row.hasOwnProperty('number1') &&  row.hasOwnProperty('number3') && !row.hasOwnProperty('number2')){
                    if(row.number1==='' && row.number3===''){
                        resultValidSingleRow.push({errorReason:'Record must have at least one phone number.',result:false});
                    }                      
                }
                if(row.hasOwnProperty('number2') &&  row.hasOwnProperty('number3') && !row.hasOwnProperty('number1')){
                    if(row.number2==='' && row.number3===''){
                        resultValidSingleRow.push({errorReason:'Record must have at least one phone number.',result:false});
                    }       
                }
                if(row.hasOwnProperty('number1') &&  row.hasOwnProperty('number2') && row.hasOwnProperty('number3')){
                    if(row.number1==='' && row.number2==='' && row.number3===''){
                        resultValidSingleRow.push({errorReason:'Record must have at least one phone number.',result:false});
                    }       
                }    
            } 

           
            _.each(row,(value,key)=>{                    
                switch (key) {
                    case 'Balance':
                        resultValidation=validator.balance(value);
                        resultValidSingleRow.push(_fillResultsBools(key,value,resultValidation));                              
                        break;  
                    case 'number1':
                        resultValidation=validator.phone(value);
                        resultValidSingleRow.push(_fillResultsBools(key,value,resultValidation));
                                            
                        break;
                    case 'number2':
                        resultValidation=validator.phone(value);
                        resultValidSingleRow.push(_fillResultsBools(key,value,resultValidation));
                        
                        break;
                    case 'number3':
                        resultValidation=validator.phone(value);
                        resultValidSingleRow.push(_fillResultsBools(key,value,resultValidation));
                        
                        break;
                    case 'email':
                        resultValidation=validator.email(value);
                        resultValidSingleRow.push(_fillResultsBools(key,value,resultValidation));
                        
                        break;           
                }             
            });                        
        }
        return resultValidSingleRow;           
    }


    function _validateRowsFiels(lodash,rowsFields,validator,actionList,skipPreview){      
        let _ = lodash;
        let validRows=[];
        let invalidRows=[];
        if(skipPreview===true){
            validRows=rowsFields;
        }else{
            _.each(rowsFields,(rowFieldObject,i)=>{
                let resultValidation=_validateSingleRow(_,rowFieldObject,validator,actionList);
        
                if(resultValidation.map(e=>e.result).indexOf(false)===-1){
                    validRows.push(rowFieldObject);
                }else{
                    let errorsReasonsFiltered=resultValidation.filter(elem=>elem.errorReason);
                    let justTextErrors=errorsReasonsFiltered.map(a=>a.errorReason);
                    invalidRows.push({lineError:i+1,errors:justTextErrors});
                }                         
            });
        }

        return {
            validRows:validRows,
            invalidRows:invalidRows
        };
    }


    function _checkSelectedFieldKeys(hasHeader, contactFields, lodash) {
        let keysNotMapped = [];
        let _ = lodash;

        let allKeysFields = _.filter(contactFields, { 'isKey': true });
        let allRepeatedKeyFields = _.filter(contactFields, el => {
            let idxFound = _.findIndex(allKeysFields, { 'name': el.name });
            return idxFound >= 0;
        });

        if (hasHeader) {
            keysNotMapped = _.chain(allRepeatedKeyFields).filter({ 'mappedName': null }).uniq('name').value();
        } else {
            keysNotMapped = _.chain(allRepeatedKeyFields).filter({ 'mappedIndex': 0 }).uniq('name').value();
        }

        return keysNotMapped;
    }

    function _getMappedFiels(hasHeader, contactFields, uniq, lodash) {
        let headerFieldsforTAble = [];
        let _ = lodash;

        if (hasHeader === true) {
            if (uniq === 'uniq') {
                headerFieldsforTAble = _.chain(contactFields)
                    .reject({ 'mappedName': null })
                    .uniq('name').value();
            } else {
                headerFieldsforTAble = _.reject(contactFields, { 'mappedName': null });
            }
        } else {
            if (uniq === 'uniq') {
                headerFieldsforTAble = _.chain(contactFields)
                    .reject({ 'mappedIndex': 0 })
                    .uniq('name').value();
            } else {
                headerFieldsforTAble = _.reject(contactFields, { 'mappedIndex': 0 });
            }
        }

        return headerFieldsforTAble;
    }


    function _getRowsFields(hasHeader, contactFields, jsonCSV, lodash,skipPreview) {
        let _ = lodash;
        let mappedFiedlsUniq = _getMappedFiels(hasHeader, contactFields, 'uniq', _);
        let mappedFiedlsAll = _getMappedFiels(hasHeader, contactFields, 'nouniq', _);


        let _cleanNotNumbers = function (val) {
            if(skipPreview){
                return val;
            }
            if(val){
               let firstChar=val.substr(0,1).replace(/[^\d\+]/g,'');
               let cleaned=firstChar+val.substr(1,val.length).replace(/[^\d]/g, '');
               return cleaned;
            }
            return '';
            
        };

        let _jsonRecordsToFieldsRecords = function (jrecord) {  
         
            let fr = {};           
            _.each(mappedFiedlsUniq, el => {
               
                let typeField = el.type;
                let fieldName = el.name;
                let mappedFieldsByName = _.filter(mappedFiedlsAll, { 'name': fieldName });
                let key;              

                if (typeField === 'PHONE') {
                    fr[fieldName] = _.chain(mappedFieldsByName)
                        .map(el2 => {  

                            if(hasHeader){
                                key=el2.mappedName;
                            }else{
                                key=el2.mappedIndex-1;
                            }                                                 
                            return _cleanNotNumbers(jrecord[key]);  // clean all non numbers characters                
                        }).join('').value();
                } else {
                    fr[fieldName] = _.chain(mappedFieldsByName)
                        .map(el2 => { 
                           if(hasHeader){
                                key=el2.mappedName;
                            }else{
                                key=el2.mappedIndex-1;
                            }                                      
                           return jrecord[key];
                        }).join(' ').value();
                }
            });
            return fr;
        };
  
        let rowsFields = _.map(jsonCSV, _jsonRecordsToFieldsRecords);     
        return rowsFields;
    }



    function _getFieldsEntries(hasHeader, contactFields, jsonCSV, lodash) {
        let fieldsEntries = [];
        let mappedFiedls = _getMappedFiels(hasHeader, contactFields, 'uniq', lodash);
        let _ = lodash;

        fieldsEntries = _.map(mappedFiedls, el => {
            let cn;
            if (hasHeader) {
                cn = Object.keys(jsonCSV[0]).indexOf(el.mappedName) + 1;
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

        console.log('result Fields Entries');
        console.log(fieldsEntries);

        return fieldsEntries;
    }


    function _scrollRowIntoView(indexRow, container) {

        let _container=angular.element(container);     
        var domEl=_container.find('tr').get(indexRow);
        if(!domEl) {         
           _container.scrollTop(1000);
        }else{
            var containerTop = _container.scrollTop(); 
            var containerBottom = containerTop + _container.height(); 
            var elemTop = domEl.offsetTop;
            var elemBottom = elemTop + angular.element(domEl).height();        
            if (elemTop < containerTop) {
                _container.scrollTop(elemTop);
            } else if (elemBottom > containerBottom) {
                _container.scrollTop(elemBottom - _container.height());
            }
        }
    }



    let _$stateParams, _$state;
    let _AlertMessage,_ContactFieldsService, _ListService, _;

    class MapFieldsController {

        constructor($stateParams, $state, lodash, ContactFieldsService, ListsService, ValidatorService, AlertMessage) {
            _ = lodash;
            _$stateParams = $stateParams;
            _AlertMessage = AlertMessage;
            _$state = $state;
            _ContactFieldsService = ContactFieldsService;
            _ListService = ListsService;       
            this.ValidatorService=ValidatorService;     
            this.hasHeader = true;
            this.delimiters = [
                { title: 'Comma', symbol: ',' },
                { title: 'Colon', symbol: ':' },
                { title: 'SemiColon', symbol: ';' },
                { title: 'Custom' }
            ];

            this.selectedDelimiter = this.delimiters[0];
            this.customDelimiterDefaultSymbol = ',';
            this.customDelimiterEnabled = false;
            this.contactFields = [];

            this.message = { show: false };
            this.loadingContacts = true;
            this.canMapping = false;
            this.selectedRow = -1;
            this.jsonCSV = [];
            this.jsonHeaders = [];
            this.selectedRowsMapped=[];
            this.sending = false;
            this.actionList='update';

        }

        $onInit() {
            this.setStateParams(_$stateParams);
        }

        setStateParams(stateParams) {
            this.getContactFiels();

            if(stateParams.name){
                this.listName = stateParams.name;
            }
            if (stateParams.manual === true) {      
                this.canMapping = false;               
            } else {
                if (stateParams.settings && stateParams.settings.csvData) {
                    this.canMapping = true; 
                    this.rawCSV = stateParams.settings.csvData;
                    this.jsonCSV = _aplyDemiliterCSV(this.rawCSV, 
                    this.customDelimiterDefaultSymbol, this.hasHeader);
                    if(stateParams.settings.listDeleteSettings){
                         this.actionList='remove';
                    }                 
                    if (this.hasHeader) {
                        this.jsonHeaders = Object.keys(this.jsonCSV[0]);
                    } else {
                        this.jsonHeaders = this.jsonCSV[0];
                    }         
                } else {
                    this.message = { show: true, type: 'warning', text: 'no csv file arrived' };
                }
            }
        }
        initArrays() {
            // TODO: Research _.fill() does not work;
            console.log('initialized arrays');
            if (this.contactFields) {
                angular.forEach(this.contactFields, (el) => {
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
            this.changeDelimiter();

        } 
        changeDelimiter() {
            let mappedFiedls = _getMappedFiels(this.hasHeader, this.contactFields, 'nouniq', _);
            //BUG:1501 - The smart mapping action is being performed for "Contact Field" who has performed a manual mapping by the user.
            if(mappedFiedls.length===0 || this.selectedDelimiter.title==='Custom'){
                console.log('clearing');
                this.clearMapping();                
            }       

            console.log('enter here 1');
            console.log(this.selectedDelimiter);
            
            this.selectedRowsMapped=[];  
            this.customDelimiterEnabled = (this.selectedDelimiter.title === 'Custom');
            if (this.customDelimiterEnabled) {
                this.jsonCSV=_aplyDemiliterCSV(this.rawCSV,this.customDelimiterDefaultSymbol,this.hasHeader);    
            } else {
                console.log('enter here');
                console.log(this.selectedDelimiter);
                this.jsonCSV=_aplyDemiliterCSV(this.rawCSV,this.selectedDelimiter.symbol,this.hasHeader);
            }

            if(this.jsonCSV.length===1){                
                this.jsonHeaders=this.jsonCSV;
            }else{
                this.jsonHeaders=Object.keys(this.jsonCSV[0]);
            }   
            console.log(`posibleHeaders:  ${this.jsonHeaders} `);

        }

        matchSmart() {
            console.log('matchSmart');        
            if (this.hasHeader === true) {
                this.changeDelimiter();    

                let tempJsonHeaders=angular.copy(this.jsonHeaders);
                tempJsonHeaders=tempJsonHeaders.map(e=>e.toUpperCase());
       
                //BUG:1498 - The fields mapped does not display as selected.
                angular.forEach(this.contactFields, (el,index) => {    
                        if (tempJsonHeaders.indexOf(el.name.toUpperCase()) >= 0 && 
                            el.hasOwnProperty('isKey') &&  
                            el.mappedName===null)  {                
                            el.mappedName = el.name;
                            this.selectedRowsMapped.push(index);
                        }
                });

                //BUG:1604 - The message for mapped fields does not behave as the java app.
                 if(this.selectedRowsMapped.length===0){                       
                    _AlertMessage({
                        title:'Message',
                        body:'Unfortunately, nothing can be mapped automatically'
                    });  
                    return this.selectedRowsMapped;
                }else{
                    _AlertMessage({
                        title:'Message',
                        body:`${this.selectedRowsMapped.length} item(s) have(s) been successfully mapped.\n
                        All affected items have been selected`
                        });     
                    return this.contactFields;
                }              

            } else {               
                console.log('the feature smart match is just for header enabled');
                return null;
            }
        }


        clearMapping() {
            // TODO: Research _.fill() does not work;
            if (this.contactFields) {
                this.selectedRowsMapped=[];
                this.selectedRow=-1;
                this.contactFields.forEach((el) => {
                    el.mappedName = null;
                    el.mappedIndex = 0;
                });
            }
        }

        nextStep() {
            console.log('next Step');
            console.log(this.contactFields);

            let keysFields = _.filter(this.contactFields,{'isKey': true});  
            let countKeys= keysFields.length;       

            if(countKeys>0 && countKeys<13){
                let dataToSend = {};
                if (this.actionList==='remove') {
                    dataToSend.listDeleteSettings = _$stateParams.settings.listDeleteSettings;
                    dataToSend.fields = keysFields;
                } else {
                    dataToSend.listUpdateSettings = _$stateParams.settings.listUpdateSettings;
                    dataToSend.fields = this.contactFields;                   
                }

                _$state.go('ap.al.listsEdit-list', {settings:dataToSend, name: _$stateParams.name, manual: true});  
                 return dataToSend;
            }
            else {
                let messageText;
                if(countKeys===0){
                    messageText = 'At least one field must be marked as key';                
                }
                else {
                    messageText = 'No more than 12 fields can be marked as key';
                }
                this.message = {type: 'warning', show: true, text: messageText, expires: 5000};
                return null;
            }  

        }

        finishMap() {
            let fieldsKeys = _.filter(this.contactFields, { 'isKey': true });
            let checkSelectedKeys = _checkSelectedFieldKeys(this.hasHeader, this.contactFields, _);

            if (this.actionList==='remove') {
                this.contactFields = fieldsKeys;
            }
            if(fieldsKeys.length>0){
                if(fieldsKeys.length>12){
                    this.message = { show: true, type: 'warning', text: `No more than 12 fields can be marked as a key`, expires: 8000 };
                    return null;
                }
                if (checkSelectedKeys.length === 0) {
                    let keyNames = _.chain(this.contactFields)
                        .filter({ isKey: true })
                        .map('name').value();
                   
                    let dataToSend = {
                        resultMapping: {
                            keys: keyNames,
                            headerFields: _getMappedFiels(this.hasHeader, this.contactFields, 'uniq', _)
                        },
                        fieldsMapping: _getFieldsEntries(this.hasHeader, this.contactFields, this.jsonCSV, _)
                    };
                    
                    if (this.actionList==='remove') {
                        dataToSend.listDeleteSettings = _$stateParams.settings.listDeleteSettings;
                    } else {
                        dataToSend.listUpdateSettings = _$stateParams.settings.listUpdateSettings;
                    }

                     let rowsFields=_getRowsFields(this.hasHeader, this.contactFields, this.jsonCSV, _,_$stateParams.settings.skipPreview);                

                     let resultValidRowsFields=_validateRowsFiels(_,rowsFields,this.ValidatorService,this.actionList,_$stateParams.settings.skipPreview);                  
                        
                     let contentModal={
                         title:'Summary'
                     };
                     let numRecords=rowsFields.length;
                  
                     if(resultValidRowsFields.invalidRows.length===0){
                        dataToSend.resultMapping.rows=resultValidRowsFields.validRows; 
                        contentModal.body=`All ${numRecords} record(s) have been successfully read from file. Records will be added to the list`;
                     } else {
                        contentModal.textCloseBtn='Close';
                        contentModal.listDetail={
                                headerList:'Invalid records',
                                cols:['Line','Error'],
                                rows:[]
                        };          
                        
                        if (resultValidRowsFields.invalidRows.length === numRecords) {
                            contentModal.body=`There are no valid records in source file`;
                            contentModal.customFunction=function(){
                                _$state.go('ap.al.lists');
                            };        
                            dataToSend.resultMapping.rows=null;  
                        }else{
                            dataToSend.resultMapping.rows=resultValidRowsFields.validRows;               
                            contentModal.body=`Only ${resultValidRowsFields.validRows.length} of ${numRecords} records have been successfully read from file. ${resultValidRowsFields.validRows.length} valid Record(s) will be added to the list`;     
                        }  
                   
                        for (var r = 0; r < resultValidRowsFields.invalidRows.length; r++) {
                            let lineError=resultValidRowsFields.invalidRows[r].lineError;
                            let joinedErrors=resultValidRowsFields.invalidRows[r].errors.join(' ; ');                            
                            contentModal.listDetail.rows.push({'line':lineError,'errors':joinedErrors});
                        }                    
                    }

                    console.log('=== DATA FOR NEXT STEPP===');
                    console.log(dataToSend);                   
                                       
                    if(_$stateParams.settings.skipPreview===true){
                         //BUG:1603 - The list flow does not completed when skipPreview
                        this.uploadContacts(dataToSend,_$stateParams.name);
                    }else{
                        _AlertMessage(contentModal); 
                        if (resultValidRowsFields.validRows.length>0){                          
                            _$state.go('ap.al.listsEdit-list', { settings: dataToSend, name: _$stateParams.name });
                        }
                    }
       
                    return dataToSend;
                } else {
                    let keyNamesNotMapped = _.map(checkSelectedKeys, 'name');
                    this.message = { show: true, type: 'warning', text: `Contact Fields \"${keyNamesNotMapped.join(' , ')}\" are marked as keys but has no mapped source field/index`, expires: 8000 };
                    return null;
                }
            } else {
                let noneMapped;
                if (this.hasHeader) {
                    noneMapped = _.reject(this.contactFields, { 'mappedName': null });
                } else {
                    noneMapped = _.reject(this.contactFields, { 'mappedIndex': 0 });
                }                
                let message =(noneMapped.length !== 0)?'At least one field must be marked as key':'At least one source fields should be mapped to Contact Field';
                this.message = { show: true, type: 'warning', text:message, expires: 8000 };
                return null;
            }
        }
        //BUG:1603-The list flow does not completed when skipPreview
        uploadContacts(dataToSend,listName){
                this.sending= true;   
                let dataContact={};

                dataContact.listName=listName;
                if(dataToSend.listUpdateSettings){
                    dataContact.listUpdateSettings=dataToSend.listUpdateSettings;
                    dataContact.listUpdateSettings.fieldsMapping=dataToSend.fieldsMapping;
                }else{                
                    dataContact.listDeleteSettings=dataToSend.listDeleteSettings;
                    dataContact.listDeleteSettings.fieldsMapping=dataToSend.fieldsMapping;
                }

                dataContact.importData={values:_.map(dataToSend.resultMapping.rows,el=>( {'item':_.map(el,elem=>elem)}) )};
                   
                console.log('dataContact');
                console.log(dataContact);

                if(dataToSend.listUpdateSettings){
                    return _ListService.addContacts(dataContact)
                            .then(response=>{  
                                if(response.statusCode === 201){
                                    if(response.data.return.identifier){
                                        this.sending= false;
                                        _$state.go('ap.al.lists', {name: dataContact.listName, identifier: response.data.return.identifier, isUpdate: true});     
                                    }
                                }
                                else{                                
                                    let theMsg= response.errorMessage; 
                                    this.message={ show: true, type: 'danger', text: theMsg, expires: 5000 };
                                }
                                return response;
                            });
                }else{
                    return _ListService.deleteContacts(dataContact)
                        .then(response=>{  
                            if(response.statusCode === 200){
                                if(response.data.return.identifier){
                                    this.sending= false;
                                    _$state.go('ap.al.lists', {name: dataContact.listName, identifier: response.data.return.identifier, isUpdate: false});     
                                }
                            }
                            else{                             
                                let theMsg= response.errorMessage; 
                                this.message={ show: true, type: 'danger', text: theMsg, expires: 5000 };
                            }
                            return response;
                    });
                }
        }

        addMappingItem() {
            console.log(`selected item ${angular.toJson(this.contactFieldSelectedName)}`);

            let clonedItem = angular.copy(this.contactFieldSelectedName);
            let idx = _.findIndex(this.contactFields, { 'name': this.contactFieldSelectedName.name });
            if (idx >= 0) {
               
                this.contactFields.splice(idx + 1, 0, clonedItem);
                let numberRepeatFields=_.filter(this.contactFields,{ 'name': clonedItem.name }).length;
                this.selectedRow=(idx+numberRepeatFields)-1;
              
            } else {
                console.log('not found field, inserted first');
                clonedItem.isKey = false;
                this.contactFields.unshift(clonedItem);
                // push first
                this.selectedRow=0;                
            }
            _scrollRowIntoView(this.selectedRow,'#table_mapping_body');

            console.log(`selected row: ${this.selectedRow}`);
            this.selectedRowsMapped=[];
            console.log(`the index found is ${idx}`);
            return idx;
        }

        removeSelectedItem() {
            console.log(this.contactFields);
            console.log(`the selected row is ${this.selectedRow}`);
            console.log('goint to delete');
            let goingToDelete = this.contactFields[this.selectedRow];

            if (goingToDelete && goingToDelete.hasOwnProperty('isKey')) {
                let posibleNext = this.selectedRow + 1;
                if (this.contactFields[posibleNext]) {
                    let nameNext = this.contactFields[posibleNext].name;
                    let nameCurrent = goingToDelete.name;
                    if (nameCurrent === nameNext) {
                        this.contactFields[posibleNext].isKey = false;
                    }
                }
                this.contactFields.splice(this.selectedRow, 1);
                this.selectedRow = -1;
                this.selectedRowsMapped=[];
                return true;
            } else {
                if (goingToDelete) {
                    this.contactFields.splice(this.selectedRow, 1);
                    this.selectedRow = -1;
                    this.selectedRowsMapped=[];
                    return true;
                } else {
                    return false;
                }
            }
        }

    }

    MapFieldsController.$inject = ['$stateParams', '$state', 'lodash', 'ContactFieldsService', 'ListsService', 'ValidatorService', 'AlertMessage'];

    angular.module('fakiyaMainApp')
        .component('al.lists.mapping', {
            templateUrl: ['$element', '$attrs', function ($element, $attrs) {
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
