'use strict';

angular.module('restApi')

.factory('RestLessons', ['$resource', function ($resource) {
    return $resource('https://wordsweb-dziadzior.rhcloud.com/lists/:id', 
    				{id: '@id'});
}]);