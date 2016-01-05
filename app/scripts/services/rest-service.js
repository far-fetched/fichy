'use strict';

angular.module('apiService')

.factory('Posts', ['$resource', function ($resource) {
    return $resource('https://wordsweb-dziadzior.rhcloud.com/languages/:id', 
    				{id: '@id'}, 
    				{'myDelete':  {method:'DELETE'}
    				});
}]);
