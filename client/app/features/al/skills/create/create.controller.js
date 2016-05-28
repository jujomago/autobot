'use strict';
(function () {

    class CreateController {
        constructor($state, SkillsService) {

            console.log('Component CreateController - al.skills.create');
            this.newSkill = {};
            this.state = $state;
            this.showSuccessMessage = false;
            this.SkillsService = SkillsService;
            this.SubmitText = 'Save';
            this.message={show:false};
        }

        save() {          
    
                this.SubmitText = 'Saving...';
                this.SkillsService.createSkill(this.newSkill)
                .then(_skillInfo => {
                    if(_skillInfo.statusCode===200){
                           console.log('ok, created');
                        this.showSuccessMessage = true;
                        this.SubmitText = 'Saved';

                        var messageObj = {
                            type: 'success',
                            text: 'Skill Created SuccessFully'
                        };

                        this.state.go('skills.list', { message: messageObj });
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
            this.state.go('skills.list');
        }

}
CreateController.$inject=['$state','SkillsService'];

angular.module('fakiyaMainApp')
        .component('al.skills.create', {
            templateUrl: 'app/features/al/skills/create/create.html',
            controller: CreateController

        });

})();
