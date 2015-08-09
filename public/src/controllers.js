function MainCtrl($http,Todo){
	var self = this;

	self.formData = {};

	self.todos = Todo.query();

	self.createTodo = function(){
		var newTodo = new Todo(self.formData);
		newTodo.$save(function(){
			self.formData = {};
			self.todos = Todo.query();		
		});
	};

	self.deleteTodo = function(id){
		Todo.delete({},{todoId: id},function(){
			self.todos = Todo.query();		
		});
	};

	self.deleteSelected = function(){
		self.todos.forEach(function(todo){
			if(todo.isChecked === true){
				self.deleteTodo(todo._id);
			}	
		});
	}

}

angular.module('todoControllers',[])
	.controller('MainCtrl',['$http','Todo',MainCtrl])