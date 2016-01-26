'use strict';


angular.module('lessonsModule')
	.controller('LessonsNavBarCtrl', ['$scope', function($scope) {
		$scope.templates =
	        [ { name: 'LESSONS', url: 'lessons.lessons', active: false},
	          { name: 'LANGUAGES', url: 'lessons.languages', active: true} ];

	     $scope.template = $scope.templates[1];


	    $scope.changeTemplate = function(which) {
	       $scope.template.active = false;
	       $scope.template = which;
	       $scope.template.active = true;
	    };
	}]);

      