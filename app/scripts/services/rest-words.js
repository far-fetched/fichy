'use strict';

angular.module('restApi')

.factory('RestWords', ['$resource', function ($resource) {
    return $resource('https://wordsweb-dziadzior.rhcloud.com/phrases/:id', 
    				{id: '@id'}, 
    				{'myDelete':  {method:'DELETE'}
    				});
}]);