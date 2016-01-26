'use strict';


angular.module('lessonsModule')
  .controller('LessonsCtrl', ['RestLanguages', 'RestLessons', '$scope', 'ngDialog', function (RestLanguages, RestLessons, $scope, ngDialog) {

  	$scope.languages = RestLanguages.query();
  	$scope.lessons = RestLessons.query();

  	$scope.addLesson = function() {

        var pop = ngDialog.open({ 
          template: 'views/lessons/new-lesson.html',
          scope: $scope,
          controller: ['$scope', '$timeout', function($scope, $timeout) {

            $scope.sendNew = function() {

              $scope.dataLoading = true;
              $http({ method: 'POST', url: 'https://wordsweb-dziadzior.rhcloud.com/languages/' + $scope.newLanguage}).
                success(function(data) {
                  $scope.newLanguage = '';
                  $scope.languages.push(data);
                  $scope.dataLoading = false;
                  $scope.message = {
                    msg: 'Correct! You added '+data.name+'.',
                    danger: false,
                    success: true
                  };

                  $timeout(function() {
                    pop.close();
                  }, 2000); 

                }).
                error(function() {
                  $scope.dataLoading = false;
                  $scope.message = {
                    msg: 'Something goes wrong! Try again...',
                    danger: true,
                    success: false
                  };

                  $timeout(function() {
                    pop.close();
                  }, 2000); 

                });

            };    

          }]});
    };

  }]);
