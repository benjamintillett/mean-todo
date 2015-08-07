'use strict';


/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
describe('Todo App', function() {
	beforeEach(function() {
		browser.get('/');
	});

	describe('Sanity Check', function() {

		it('has the correct title',function(){
			expect(browser.getTitle()).toMatch(/Todo's/);
		});			
	});	
	
	describe('creating a todo',function(){


		it('filling in the the input with "hello" and pressing the "add" button creates a todo',function(){

			var formText = element(by.model('main.formData.text'));
	 		var todoTextColumn = element.all(by.repeater('todo in main.todo').column('todo.text'));

	 		function getTodoTexts(){
	 			return todoTextColumn.map(function(elm){
	 				return elm.getText();
	 			});
	 		}

	 		formText.sendKeys('hello');
	 		element(by.css('[ng-click="main.createTodo()"]')).click();
	 		expect(getTodoTexts()).toContain('hello');
		}); 
	});

	describe('deleting todos', function(){
		it('pressing delete, deletes all selected todos',function(){

			var todoTextColumn = element.all(by.repeater('todo in main.todo').column('todo.text'));
	 		
	 		function getTodoTexts(){
	 			return todoTextColumn.map(function(elm){
	 				return elm.getText();
	 			});
	 		}
	 		element.all(by.repeater('todo in main.todo')).then(function(todos){
				todos.forEach(function(elm){
					elm.element(by.css('[ng-model="todo.isChecked"]')).click();	
				});
			});
			element(by.css('[ng-click="main.deleteSelected()"]')).click();	
			expect(getTodoTexts()).toEqual([]);
		});
	});
});



















