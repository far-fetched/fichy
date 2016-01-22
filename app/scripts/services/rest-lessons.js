'use strict';

angular.module('apiService')

.factory('Lessons', ['$resource', function ($resource) {
    return $resource('https://wordsweb-dziadzior.rhcloud.com/lists/:id', 
    				{id: '@id'});
}]);