'use strict';

function DummyServices() {
   let _services = [
        {
            name:'ccc',
            fullName: 'Contact Center Compliance',
            description: 'Contact Center Compliance is an experienced cloud based compliance provider that reduces the complexity of TCPA Wireless and DNC regulations. DNC.com provides several unique compliance solutions including: TCPA Litigator Scrub, TCPA Wireless and VoIP Scrubbing, as well as an award winning Compliance Guide with Compliance Training. We also provide data enhancement solutions including TCPA wireless number verification. Learn why leading companies trust DNC.com to manage their TCPA liability.',
             partner:''
        },
        {
            name:'tfsb',
            fullName: 'Quick Start for Salesforce - Bronze',
            description: 'Trueforce offers the ability to get up and running with Salesforce quickly. Packages offer system configuration, set up, data migration and training. Custom packages are also available.',
            list: '<ul class="list-services"> <li>Assessment and Configuration <ol> <li>Virtual needs assessment meeting and project review meeting</li> <li>Basic System Configuration <ul> <li>Setup company profile</li> <li>Create up to 10 system users</li> <li>Configure Outlook email plugin</li> </ul> </li> <li>Creation of up to 10 custom fields</li> </ol> </li> <li>Training <ol> <li>Three hours of remote end user training for an unlimited number of users.</li> <li>One hour Q&A session (one or two weeks following training)</li> </ol> </li> </ul>',           
            partner:'Trueforce'
        },
        {
            name:'tfss',
            fullName: 'Quick Start for Salesforce - Silver',
            description: 'Trueforce offers the ability to get up and running with Salesforce quickly. Packages offer system configuration, set up, data migration and training. Custom packages are also available.',
            list: '<ul class="list-services"> <li>Assessment and Configuration <ol> <li>Virtual needs assessment meeting and project review meeting</li> <li>System Configuration <ul> <li>Setup company profile</li> <li>Create up to 10 system users and two custom profiles</li> <li> Configure Outlook plugin</li> </ul> </li> <li>Creation of up to 15 custom fields</li> <li>Creation of up to two basic custom reports</li> <li>Basic forecasting configuration</li> </ol> </li> <li>Data Import <ol> <li>Import of basic contacts and accounts (CSV import files to be provided by client)</li> </ol> </li> <li>Training <ol> <li>Three hours of remote training for an unlimited number of users</li> <li>One hour Q&A session (one or two weeks following training)</li> </ol> </li> </ul>',            
            partner:'Trueforce'
        },
        {
            name:'tfsg',
            fullName: 'Quick Start for Salesforce - Gold',
            description: 'Trueforce offers the ability to get up and running with Salesforce quickly. Packages offer system configuration, set up, data migration and training. Custom packages are also available.',
            list: '<ul class="list-services"> <li>Assessment and Configuration <ol> <li>Virtual needs assessment meeting and project review meeting</li> <li>System Configuration <ul> <li>Setup company profile</li> <li>Create up to 10 system users and two custom profiles</li> <li>Configure Outlook plugin</li> </ul> </li> <li>Creation of up to 20 custom fields</li> <li>Creation of up to three basic custom reports</li> <li>Creation of up to three custom dashboards</li> <li>Basic forecasting setup</li> </ol> </li> <li>Data Import <ol> <li>Import of basic contacts, accounts and opportunities (CSV import files to be provided by client)</li> </ol> </li> <li>Training <ol> <li>Four hours of remote end user training for an unlimited number of users</li> <li>Two hours of basic admin training</li> <li>Three, one hour ongoing support sessions</li> </ol> </li> </ul>',  partner:'Trueforce'
        }
    ];

  // Public API here
  return {
      getData(name){
          if(name){            
            return _services.filter((item)=>item.name===name);
          }
          return _services;
      }
  };
}


angular.module('fakiyaMainApp')
  .factory('DummyServices', DummyServices);