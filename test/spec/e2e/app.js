'use strict';

describe('E2E: main page', function() {

  beforeEach(function() {
    browser.get('http://127.0.0.1:9000/');
  });

	it('should load the navbar', function() {
	  var ele = by.id('custom-bootstrap-menu');
	  expect(browser.isElementPresent(ele)).toBe(true);
	});

	it('should login admin qwe => login page', function() {
		element(by.model('username')).sendKeys('admin');
		element(by.model('password')).sendKeys('qwe');
		element(by.buttonText('Login')).click();
		expect(browser.getCurrentUrl())
    	.toBe('http://127.0.0.1:9000/#/lessons');
	});

	it('should undisabled button', function() {
		var input = element(by.model('newLanguage'));
		expect(input.isEnabled()).toBe(true);
		input.sendKeys('qwe');
		expect(input.getAttribute('value')).toBe('qwe');
        expect(input.isEnabled()).toBe(true);
    });



});