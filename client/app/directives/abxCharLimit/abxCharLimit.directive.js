'use strict';

angular.module('fakiyaMainApp')
	.directive('abxCharLimit', function () {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				let limit = attrs.abxCharLimit;
				let keycodes = [8, 37, 38, 39, 40, 46]; // ignore backspace, delete, and arrow keys.		
		
				element.bind('keypress', event => {
					if (element.val().length >= limit) {
						if (keycodes.indexOf(event.keyCode) === -1) {
							event.preventDefault();
						}
					}
				});
			}
		};
	});
