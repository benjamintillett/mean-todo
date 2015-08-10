describe('todoControllers',function(){


	describe('MainCtrl', function() {

		var scope, ctrl, $httpBackend;

		beforeEach(module('todo'));

		beforeEach(inject(function(_$httpBackend_,$rootScope,$controller){
			$httpBackend = _$httpBackend_;
			$httpBackend.when('GET','/api/todos')
				.respond([{text: "this is the first todo", _id: '1'},{text: 'this is the second todo', _id: '2'}]);

			scope = $rootScope.$new();
			ctrl  = $controller('MainCtrl as list', {$scope: scope});
		}));

		it('loads the todos fetched from ajax',function(){
			$httpBackend.flush();

			expect(scope.list.todos).toEqualData([{text: "this is the first todo", _id: '1'},{text: 'this is the second todo', _id: '2'}]);
		});

		describe('.deleteTo',function(){
			it('tells the server to delete the selected todos',function(){
				$httpBackend.flush();
				scope.list.todos[0].isChecked = true;
				scope.list.deleteSelected();
				$httpBackend.expectDELETE('/api/todos/1')
					.respond('hello');
				$httpBackend.flush();
			});
		})

		describe('.createTodo',function(){
			it('send the correct data to the server',function(){
				scope.list.formData = { text: "hello" }
				$httpBackend.expectPOST('/api/todos', { text: 'hello'}).respond(201, '');
				scope.list.createTodo();
				$httpBackend.flush();
			});
		});

		describe('.deleteTodo',function(){
			it('send a delete request with the given id',function(){
				$httpBackend.expectDELETE('/api/todos/xx1z').respond(200, '');
				scope.list.deleteTodo('xx1z');
				$httpBackend.flush();
			});
		});

		
	});
});