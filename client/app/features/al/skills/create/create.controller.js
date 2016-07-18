'use strict';
(function () {
    let _$state,_SkillsService;
    class CreateController {
        constructor($state, SkillsService) {

            console.log('Component CreateController - al.skills.create');
            this.newSkill = {};
            _$state = $state;
            _SkillsService = SkillsService;
            this.showSuccessMessage = false;
            this.SubmitText = 'Save';
            this.message={show:false};
        }

        save() {              
                this.SubmitText = 'Saving...';
                _SkillsService.createSkill(this.newSkill)
                .then(_skillInfo => {
                    if(_skillInfo.statusCode===200){
                           console.log('ok, created');
                        this.showSuccessMessage = true;
                        this.SubmitText = 'Saved';

                        var messageObj = {
                            type: 'success',
                            text: 'Skill Created SuccessFully'
                        };

                        _$state.go('ap.al.skills', { message: messageObj });
                    } else {
                        console.warn('there is an error');
                        this.message={show:true,type:'danger',text:_skillInfo.errorMessage};
                        this.SubmitText = 'Save';
                    }
                }).catch(err => {
                    console.log('error in client');
                    console.error(err);
                    this.message={show:true,type:'warning',text:err};
                });           
        }
        cancel() {
            _$state.go('ap.al.skills');
        }

}
CreateController.$inject=['$state','SkillsService'];

angular.module('fakiyaMainApp')
        .component('al.skills.create', {
            templateUrl: 'app/features/al/skills/create/create.html',
            controller: CreateController

        });

})();
