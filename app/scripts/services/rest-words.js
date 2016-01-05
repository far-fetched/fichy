'use strict';

angular.module('apiService')

.factory('Words', ['$resource', function ($resource) {
    return $resource('https://wordsweb-dziadzior.rhcloud.com/phrases/:id', 
    				{id: '@id'}, 
    				{'myDelete':  {method:'DELETE'}
    				});
}]);