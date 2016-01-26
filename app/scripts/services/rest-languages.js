'use strict';

angular.module('restApi')

.factory('RestLanguages', ['$resource', function ($resource) {
    return $resource('https://wordsweb-dziadzior.rhcloud.com/languages/:id', 
    				{id: '@id'}, 
    				{'myDelete':  {method:'DELETE'}
    				});
}]);
