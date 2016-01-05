'use strict';

/**
 * @ngdoc function
 * @name wordsWebFrontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the wordsWebFrontendApp
 */
angular.module('basicCtrls')
  .controller('LessonsCtrl', ['Posts', '$scope', '$filter', '$http', 'ngDialog', '$timeout', function (Posts, $scope, $filter, $http, ngDialog, $timeout) {

      $scope.initBarHelp = function () {
        $(function () { // jshint ignore:line
            $scope.helpBar = $('[data-toggle="tooltip"]').tooltip(); // jshint ignore:line

          });

      };

      $scope.message = {
        msg: 'min 3 characters (only letters allowed)',
        type: 'alert alert-info',
        hide: true
      };

      $scope.newLanguage = '';
      $scope.dataLoading = false;

      $scope.initBarHelp();
      $scope.languages = Posts.query();
      
      $scope.templates =
        [ { name: 'LESSONS', url: 'lessons.list', active: false},
          { name: 'LANGUAGES', url: 'lessons.languages', active: true} ];

      $scope.template = $scope.templates[1];


      $scope.changeTemplate = function(which) {
        $scope.template.active = false;
        $scope.template = which;
        $scope.template.active = true;
      };

      $scope.addLanguage = function() {

        $scope.dataLoading = true;
        $http({ method: 'POST', url: 'https://wordsweb-dziadzior.rhcloud.com/languages/' + $scope.newLanguage}).
          success(function(data) {
            $scope.newLanguage = '';
            $scope.languages.push(data);
            $scope.dataLoading = false;
            $scope.message = {
              msg: 'Correct! You added '+data.name+'.',
              type: 'alert alert-success',
              hide: false
            };

            $timeout(function(){
                $scope.message = {
                  hide: true
                };
            }, 3000);

          }).
          error(function() {
            $scope.dataLoading = false;
            $scope.message = {
              msg: 'Something went wrong! Try again...',
              type: 'alert alert-danger'
            };
          });

      };

      $scope.removeLanguage = function(language) {
        $scope.dataLoading = true;
        var idRemove = $scope.languages.indexOf(language);
        var feedback = language.name;

        Posts.myDelete({id: language.id}, function() {
          $scope.message = {
            msg: 'Deleted '+feedback+'!',
            type: 'alert alert-success',
            hide: false
          };

          $timeout(function(){
              $scope.message = {
                hide: true
              };
          }, 3000);

          $scope.languages.splice(idRemove, 1);
          $scope.dataLoading = false;
          
        }, function() {
            $scope.dataLoading = false;
            $scope.message = {
              msg: 'Something went wrong! Try again...',
              type: 'alert alert-danger'
            };          
        });

      };

      $scope.editLanguage = function(language) {
        
        $scope.toEdit = language.name;

        var pop = ngDialog.open({ 
          template: 'views/edit.html',
          scope: $scope,
          controller: ['$scope', '$timeout', function($scope, $timeout) {
        
            $scope.language = language;
            $scope.sendEdited = function() {
                $scope.dataLoading = true;

                var objToSend = {
                  id: $scope.language.id,
                  name: $scope.toEdit
                };

                $http.put('https://wordsweb-dziadzior.rhcloud.com/languages', $filter('json')(objToSend)).
                  success(function() {
                    $scope.dataLoading = false;
                    $scope.massage = 'correct!';
                    $scope.success = true;
                    $timeout(function() {
                      pop.close();
                    }, 1000); 
                    $scope.language.name = $scope.toEdit;
                      
                  }).
                  error(function() {
                    $scope.dataLoading = false;
                    $scope.massage = 'error! Try again';
                    $scope.danger = true;
                    $timeout(function() {
                      pop.close();
                    }, 1000); 
                  });

            };
          }]
          
        });

      };



  }]);
