'use strict';

/**
 * @ngdoc function
 * @name wordsWebFrontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the wordsWebFrontendApp
 */
angular.module('lessonsModule')
  .controller('LanguagesCtrl', ['RestLanguages', '$scope', '$filter', '$http', 'ngDialog', function (RestLanguages, $scope, $filter, $http, ngDialog) {

      $scope.dataLoading = false;

      $scope.languages = RestLanguages.query();
      
      $scope.removeLanguage = function(language) {
        $scope.dataLoading = true;
        var idRemove = $scope.languages.indexOf(language);

        RestLanguages.myDelete({id: language.id}, function() {
            $scope.languages.splice(idRemove, 1);
            $scope.dataLoading = false; 
        }, function() {
            $scope.dataLoading = false;                 
        });
          
      };

      $scope.editLanguage = function(language) {
        
        $scope.toEdit = language.name;

        var pop = ngDialog.open({ 
          template: 'views/lessons/edit-language.html',
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
      
                    $scope.message = {
                      msg: 'Correct!',
                      danger: false,
                      success: true
                    };
                    $timeout(function() {
                      pop.close();
                    }, 2000); 

                    $scope.language.name = $scope.toEdit;
                      
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
          }]
          
        });

      };

      $scope.addLanguage = function() {

        var pop = ngDialog.open({ 
          template: 'views/lessons/new-language.html',
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
