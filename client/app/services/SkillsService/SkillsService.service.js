'use strict';
(function () {
    let http;

    //let endPointUrl = 'http://localhost:9000/api/f9/skills';

    class SkillsService {
        constructor($http, appConfig) {
            this.endPointUrl = '/f9/skills';
            if (appConfig.apiUri) {
                console.log('APPCONFIG VALUE=========>>>>>>> ' + appConfig.apiUri);
                console.log('CONCATENATED VALUE=========>>>>>>> ' + appConfig.apiUri + '/f9/skills');
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
            return http.put(this.endPointUrl + '/update', skill)
                .then(response => {
                    if (response.data) {
                        return response.data.return;
                    }
                    return null;
                });

        }
        createSkill(skill) {
            var result = { data: null, statusCode: 200, errorMessage: '' };
            return http.post(this.endPointUrl + '/create', skill)
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
            var result = { data: null, statusCode: 204, errorMessage: '' };
            return http.delete(this.endPointUrl + '/delete/' + skill.name)
                .then(response => {
                    if (response.status !== 204) {
                        result.statusCode = response.status;
                        result.data = response;
                    }
                    return result;
                });
        }

    }

    SkillsService.$inject = ['$http','appConfig'];
    angular.module('fakiyaMainApp')
        .service('SkillsService', SkillsService);

})();