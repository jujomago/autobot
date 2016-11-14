'use strict';
(function () {
    let http;

    //let endPointUrl = 'http://localhost:9000/api/f9/skills';
    let _HandleError;
    class SkillsService {
        constructor($http, appConfig, HandleError) {
            this.endPointUrl = '/f9/skills';
            _HandleError = HandleError;
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
                .catch(err => _HandleError(err, result));
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
                .catch(err => _HandleError(err, result));
        }



        getSkill(name) {
            var result = { data: null, statusCode: 200, errorMessage: '' };
            return http.get(this.endPointUrl + '/' + name)
                .then(response => {
                    if (response.data) {
                        result.data = response.data.return;
                    }
                    return result;
                })
                .catch(err => _HandleError(err, result));

        }
        updateSkill(skill) {
            var result = { data: null, statusCode: 200, errorMessage: '' };
            return http.put(this.endPointUrl , skill)
                .then(response => {
                    if (response.data) {
                        result.data = response.data.return;
                    }
                    return result;
                })
                .catch(err => _HandleError(err, result));

        }
        createSkill(skill) {
            var result = { data: null, statusCode: 200, errorMessage: '' };
            return http.post(this.endPointUrl , skill)
                .then(response => {
                    if (response.status !== 200) {
                        result.statusCode = response.data.statusCode;
                        result.errorMessage = response.data.body;
                    } else {
                        result.data = response.data.return;
                    }
                    return result;
                })
                .catch(err => _HandleError(err, result));

        }
        deleteSkill(skill) {
            var result = { data: null, statusCode: 204, errorMessage: '' };
            return http.delete(this.endPointUrl + '/' + skill.name)
                .then(response => {
                    if (response.status !== 204) {
                        result.statusCode = response.status;
                        result.data = response;
                    }
                    return result;
                })
                .catch(err => _HandleError(err, result));
        }

    }

    SkillsService.$inject = ['$http','appConfig', 'HandleError'];
    angular.module('fakiyaMainApp')
        .service('SkillsService', SkillsService);

})();
