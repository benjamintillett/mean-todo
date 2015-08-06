'use strict';


/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
describe('Todo App', function() {
	describe('Todo index view', function() {

		beforeEach(function() {
			browser.get('/');
		});

		it('has the correct title',function(){
			expect(browser.getTitle()).toMatch(/Todo's/);
		});			
	});	
});



















