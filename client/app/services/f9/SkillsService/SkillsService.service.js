'use strict';
(function () {
    let http;

    //let endPointUrl = 'http://localhost:9000/api/f9/skills';

    class SkillsService {
        constructor($http, appConfig) {
            this.endPointUrl = '/f9/skills';
            if (appConfig.apiUri) {
                this.endPointUrl = appConfig.apiUri + this.endPointUrl;
            }

            http = $http;
        }

        getSkills() {

            var result = { data: null, statusCode: 200, errorMessage: '' };

            return http.get(this.endPointUrl)
                .then(response => {
                    if (response.data) {
                        result.data = response.data.return;
                        return result;
                    }
                })
                .catch(error => {
                    result.statusCode = error.status;
                    result.errorMessage = error.data.body;
                    return result;
                });
        }
        
        getSkillsInfo() {

            var result = { data: null, statusCode: 200, errorMessage: '' };

            return http.get(this.endPointUrl+'/skillsInfo')
                .then(response => {
                    if (response.data) {
                        result.data = response.data.return;
                        return result;
                    }
                })
                .catch(error => {
                    result.statusCode = error.status;
                    result.errorMessage = error.data.body;
                    return result;
                });
        }
        
        

        getSkill(name) {
            return http.get(this.endPointUrl + '/' + name)
                .then(response => {
                    if (response.data) {
                        return response.data.return;
                    }
                    return null;
                });

        }
        updateSkill(skill) {
            return http.put(this.endPointUrl , skill)
                .then(response => {
                    if (response.data) {
                        return response.data.return;
                    }
                    return null;
                });

        }
        createSkill(skill) {
            var result = { data: null, statusCode: 200, errorMessage: '' };
            return http.post(this.endPointUrl , skill)
                .then(response => {
                    console.log('response createSkill');
                    console.log(response);
                    if (response.status !== 200) {
                        result.statusCode = response.data.statusCode;
                        result.errorMessage = response.data.body;
                    } else {
                        result.data = response.data.return;
                    }
                    return result;
                })
                .catch(err => {
                    result.statusCode = err.data.statusCode;
                    result.errorMessage = err.data.body;
                    return result;
                });

        }
        deleteSkill(skill) {
            console.log('skill name in service');
            console.log(skill.name);
      
            var result = { data: null, statusCode: 204, errorMessage: '' };
            return http.delete(this.endPointUrl + '/' + skill.name)
                .then(response => {
                    console.log('response in service');
                    console.log(response);
                    if (response.status !== 204) {
                        result.statusCode = response.status;
                        result.data = response;
                    }
                    return result;
                })
                 .catch(err => {
                    result.statusCode = err.data.statusCode;
                    result.errorMessage = err.data.body;
                    return result;
                });
        }

    }

    SkillsService.$inject = ['$http','appConfig'];
    angular.module('fakiyaMainApp')
        .service('SkillsService', SkillsService);

})();