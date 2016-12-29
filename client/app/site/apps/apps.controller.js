'use strict';
(function () {
    let _$state, _$anchorScroll, _$stateParams;
    let _GetHomePage;

    let _services = [
        {
            name:'ccc',
            fullName: 'Compliance',
            description: 'Contact Center Compliance is an experienced cloud based compliance provider that reduces the complexity of TCPA Wireless and DNC regulations. DNC.com provides several unique compliance solutions including: TCPA Litigator Scrub, TCPA Wireless and VoIP Scrubbing, as well as an award winning Compliance Guide with Compliance Training. We also provide data enhancement solutions including TCPA wireless number verification. Learn why leading companies trust DNC.com to manage their TCPA liability.',
            path:'ccc',
            partner:'Contact Center'

        },
        {
            name:'tfsb',
            fullName: 'Quick Start for Salesforce Bronze',
            description: 'Trueforce offers the ability to get up and running with Salesforce quickly. Packages offer system configuration, set up, data migration and training. Custom packages are also available.',
            list: '<ul class="list-services"> <li>Assessment and Configuration <ol> <li>Virtual needs assessment meeting and project review meeting</li> <li>Basic System Configuration <ul> <li>Setup company profile</li> <li>Create up to 10 system users</li> <li>Configure Outlook email plugin</li> </ul> </li> <li>Creation of up to 10 custom fields</li> </ol> </li> <li>Training <ol> <li>Three hours of remote end user training for an unlimited number of users.</li> <li>One hour Q&A session (one or two weeks following training)</li> </ol> </li> </ul>',
            path:'tf',
            partner:'Trueforce'
        },
        {
            name:'tfss',
            fullName: 'Quick Start for Salesforce Silver',
            description: 'Trueforce offers the ability to get up and running with Salesforce quickly. Packages offer system configuration, set up, data migration and training. Custom packages are also available.',
            list: '<ul class="list-services"> <li>Assessment and Configuration <ol> <li>Virtual needs assessment meeting and project review meeting</li> <li>System Configuration <ul> <li>Setup company profile</li> <li>Create up to 10 system users and two custom profiles</li> <li> Configure Outlook plugin</li> </ul> </li> <li>Creation of up to 15 custom fields</li> <li>Creation of up to two basic custom reports</li> <li>Basic forecasting configuration</li> </ol> </li> <li>Data Import <ol> <li>Import of basic contacts and accounts (CSV import files to be provided by client)</li> </ol> </li> <li>Training <ol> <li>Three hours of remote training for an unlimited number of users</li> <li>One hour Q&A session (one or two weeks following training)</li> </ol> </li> </ul>',
            path:'tf',
            partner:'Trueforce'
        },
        {
            name:'tfsg',
            fullName: 'Quick Start for Salesforce Gold',
            description: 'Trueforce offers the ability to get up and running with Salesforce quickly. Packages offer system configuration, set up, data migration and training. Custom packages are also available.',
            list: '<ul class="list-services"> <li>Assessment and Configuration <ol> <li>Virtual needs assessment meeting and project review meeting</li> <li>System Configuration <ul> <li>Setup company profile</li> <li>Create up to 10 system users and two custom profiles</li> <li>Configure Outlook plugin</li> </ul> </li> <li>Creation of up to 20 custom fields</li> <li>Creation of up to three basic custom reports</li> <li>Creation of up to three custom dashboards</li> <li>Basic forecasting setup</li> </ol> </li> <li>Data Import <ol> <li>Import of basic contacts, accounts and opportunities (CSV import files to be provided by client)</li> </ol> </li> <li>Training <ol> <li>Four hours of remote end user training for an unlimited number of users</li> <li>Two hours of basic admin training</li> <li>Three, one hour ongoing support sessions</li> </ol> </li> </ul>',
            path:'tf',
            partner:'Trueforce'
        }
    ];


    class AppsComponent {
        constructor($stateParams, $state, $anchorScroll, AppsService, GetHomePage, EnumManager) {
            this.partners = [];
            this.message = {show: false};
            this.AppsService = AppsService;
            this.appStatus = EnumManager.getEnums();
            _$state = $state;
            _GetHomePage = GetHomePage;
            _$stateParams = $stateParams;
            _$anchorScroll = $anchorScroll;
            this.found = false;
            this.services=_services;
        }

        $onInit() {
            this.getApps();
        }

        //BUG 2110 The Partner name does not redirect me to the corresponding Partner section
        $postLink() {
            this.getApps()
                .then(() => {
                    angular.element(document).ready(function () {
                        if (_$stateParams.paramAppSelected) {
                            _$anchorScroll.yOffset = 90;
                            _$anchorScroll(_$stateParams.paramAppSelected);
                        }
                    });
                });
        }

        selectInstalledApp(appName) {
            _$state.go(_GetHomePage.of(appName));
        }

        selectNoInstalledApp(item) {
            _$state.go('ap.partneraccounts', {partnerId: item.partner.partnerName, appName: item.app.appName});
        }

        getApps() {
            return this.AppsService.getApps()
                .then(response => {
                    this.partners = response.data;
                    this.found = true;
                    return response;
                })
                .catch(error => {
                    let theMsg = error.errorMessage;
                    this.message = {show: true, type: 'danger', text: theMsg};
                    return error;
                });
        }
    }
    AppsComponent.$inject = ['$stateParams', '$state', '$anchorScroll', 'AppsService', 'GetHomePage', 'EnumManager'];
    angular.module('fakiyaMainApp')
        .component('apps', {
            templateUrl: 'app/site/apps/apps.html',
            controller: AppsComponent
        });
})();
