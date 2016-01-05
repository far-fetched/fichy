'use strict';

describe('PhoneCat controllers', function() {

	beforeEach(module('wordsWebFrontendApp'));
  	beforeEach(module('basicCtrls'));
  	beforeEach(module('apiService'));
    
  	var scope, $httpBackend, ctrl;
    var languagesData = 
            [
            {id:1, name:'polski'},
            {id:3, name:'deutsch'},
            {id:5, name:'francais'},
            {id:7, name:'brasileno'},
            {id:11, name:'italiano'},
            {id:12, name:'magyar'}
            ];         



    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('https://wordsweb-dziadzior.rhcloud.com/languages').respond(languagesData);

      scope = $rootScope.$new();
      ctrl = $controller('LessonsCtrl', {$scope: scope});
    }));


    it('should fetch all languages', function() {

      $httpBackend.flush();
      expect(angular.equals(scope.languages, languagesData)).toBe(true);
    });
  	


});