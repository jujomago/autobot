'use strict';

angular.module('fakiyaMainApp')
  .directive('abxLoadIndicator', function ($window) {
    return {
      templateUrl: 'app/directives/abxLoadIndicator/abxLoadIndicator.html',
      restrict: 'E',     
      link: function (scope, element, attrs) {

        let loaderIndicator= element.find('.loader_indicator');
        let rightSide=angular.element('.rightside');
        let mainContainer=$('#main-container');

        if(!attrs.absolute){
            loaderIndicator.css('position','absolute');
        }

        function centerMessage() {  

          let widthRightSide=rightSide.innerWidth();

          let rightOffset=Math.ceil((widthRightSide-200)/2);

          loaderIndicator.css('right',rightOffset);


          let heightViewPort=mainContainer.innerHeight();

          let topOffset=Math.ceil((heightViewPort/2)-50);

          loaderIndicator.css('top',topOffset);

       }

        angular.element($window).on('resize', function() {
            scope.$apply(function() {
                centerMessage();
            });
        });

        centerMessage();

        if(attrs.text){
           element.find('p').html(attrs.text);
        }
      }
    };
  });
