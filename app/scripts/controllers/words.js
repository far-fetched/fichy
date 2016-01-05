'use strict';


angular.module('basicCtrls')
	.controller('WordsCtrl', ['$scope', 'Words', 'Posts', function($scope, Words, Posts) {

		$scope.dataLoading = false;
		$scope.languages = Posts.query();
		$scope.examplesOne = [{id: 0, content: ''}];
		$scope.examplesTwo = [{id: 0, content: ''}];

		$scope.newPair = {
			phraseOne: '',
			phraseTwo: ''
		};

		$scope.addExample = function(which) {

			//which - true => examplesOne
			//        false => examplesTwo

			var chosenTableExamples;

			if (which) {
				chosenTableExamples = $scope.examplesOne; 
			} else {
				chosenTableExamples = $scope.examplesTwo;
			}

			var lastId = chosenTableExamples[chosenTableExamples.length-1].id;
			var example = {
				id: lastId+1,
				content: ''
			};
			chosenTableExamples.push(example);

			 			
		};

		$scope.addWord = function() {
		
			/*$scope.dataLoading = true;
			$scope.word = new Words();

			$scope.word.content = $scope.newWord;

			Words.save($scope.word, function() {
			    $scope.newWord = '';
			    $scope.dataLoading = false;
			}, function() {
				$scope.dataLoading = false;
			});
*/
		};

		$scope.removeWord = function(idWord) {
	       
	       	$scope.dataLoading = true;
	        Words.myDelete({id: idWord}, function() {
	        	$scope.dataLoading = false;
	        	$scope.$broadcast('angucomplete-alt:clearInput');
	        }, function() {
	        	$scope.dataLoading = false;
	        });
	       
	    };
		
		$scope.remoteUrlRequestFn = function(str) {
	      return {
	    			//languageId: $scope.chosenLanguage,
	      			phrase: str
	      		};
    	};

		
	}]);