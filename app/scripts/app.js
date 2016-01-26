'use strict';

/**
 * @ngdoc overview
 * @name wordsWebFrontendApp
 * @description ap
 * # wordsWebFrontendApp
 *
 * Main module of the application.
 */


angular.module('lessonsModule', ['ngDialog', 'restApi', 'ui.bootstrap']);
angular.module('wordsModule', ['restApi', 'angucomplete-alt']);
angular.module('learnModule', []);
angular.module('navBarCtrl', []);
angular.module('restApi', ['ngResource']);
angular.module('authentication', ['base64']);
angular.module('myDirectives', []);


angular
  .module('wordsWebFrontendApp', [
    'ngCookies',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'lessonsModule',
    'wordsModule',
    'learnModule',
    'navBarCtrl',
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
        templateUrl: 'views/lessons/main-lessons.html',
        controller: 'LessonsNavBarCtrl'
      })
      .state('lessons.languages', {
        url: '/languages',
        templateUrl: 'views/lessons/languages.html',
        controller: 'LanguagesCtrl'
      })
      .state('lessons.lessons', {
        url: '/lessons',
        templateUrl: 'views/lessons/lessons.html',
        controller: 'LessonsCtrl'
      })
      .state('words', {
        url: '/words',
        templateUrl: 'views/words/words.html',
        controller: 'WordsCtrl'
      })
      .state('learn', {
        url: '/learn',
        templateUrl: 'views/learn/learn.html',
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

  