describe('todoServices',function(){

	var Todo;

	beforeEach(module('todoServices'));

	describe('Todo',function(){

		beforeEach(function(){
			inject(function($injector){
				Todo = $injector.get('Todo');
			});
		});

		beforeEach(inject(function(_$httpBackend_,$rootScope){
			$httpBackend = _$httpBackend_;
			$httpBackend.when('GET','/api/todos')
				.respond([{text: "this is the first todo", _id: '1'},{text: 'this is the second todo', _id: '2'}]);
		}));

		it('gets a list of todos from the server',function(){
			var todos = Todo.query();
			$httpBackend.flush();
			expect(todos).toEqualData([{text: "this is the first todo", _id: '1'},{text: 'this is the second todo', _id: '2'}]);
		});

	})

});
