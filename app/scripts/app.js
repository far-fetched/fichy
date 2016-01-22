'use strict';

/**
 * @ngdoc overview
 * @name wordsWebFrontendApp
 * @description ap
 * # wordsWebFrontendApp
 *
 * Main module of the application.
 */

angular.module('basicCtrls', ['apiService', 'ngDialog', 'angucomplete-alt', 'myDirectives']);
angular.module('apiService', ['ngResource']);
angular.module('authentication', ['base64']);
angular.module('myDirectives', []);

angular
  .module('wordsWebFrontendApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'basicCtrls',
    'authentication',
    'ui.router', 
    'anim-in-out'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/lessons/languages');
    //
    // Now set up the states
    $stateProvider
      .state('lessons', {
        url: '/lessons',
        templateUrl: 'views/main-lessons.html',
        controller: 'LessonsCtrl'
      })
      .state('lessons.languages', {
        url: '/languages',
        templateUrl: 'views/languages.html',
        controller: 'LessonsCtrl'
      })
      .state('lessons.list', {
        url: '/list',
        templateUrl: 'views/lessons.html',
        controller: 'LessonsListCtrl'
      })
      .state('words', {
        url: '/words',
        templateUrl: 'views/words.html',
        controller: 'WordsCtrl'
      })
      .state('learn', {
        url: '/learn',
        templateUrl: 'views/learn.html',
        controller: 'LearnCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      });

  })
  
  .run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
  //event, next, current
        $rootScope.$on('$locationChangeStart', function () {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);

  