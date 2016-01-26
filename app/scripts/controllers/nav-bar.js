'use strict';


angular.module('navBarCtrl')
	.controller('ActiveNavBarCtrl', ['$scope', '$location', function($scope, $location) {
		$scope.isActive = function (viewLocation) { 
        	
        	if ($location.path().indexOf(viewLocation)===-1) {
        		return false;
        	} else {
        		return true;
        	}

    	};
	}]);