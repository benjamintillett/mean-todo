angular.module('todo',[ 'ngMaterial' ]);

function MainCtrl($http){
	var self = this;

	self.formData = {};

	$http.get('/api/todos/')
		.success(function(data){
			self.todos = data;
		})
		.error(function(data){
			console.log('Error: ' + data);
		});


	self.createTodo = function(){
		$http.post('/api/todos',self.formData)
			.success(function(data){
				self.formData = {};
				self.todos = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
	};

	self.deleteTodo = function(id){
		$http.delete('/api/todos/' + id)
			.success(function(data) {
				self.todos = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
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

angular.module('todo')
	.controller('MainCtrl',MainCtrl)