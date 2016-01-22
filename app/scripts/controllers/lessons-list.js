'use strict';


angular.module('basicCtrls')
  .controller('LessonsListCtrl', ['Posts', 'Lessons', '$scope', function (Posts, Lessons, $scope) {

  	$scope.languages = Posts.query();
  	$scope.lessons = Lessons.query();

  }]);
