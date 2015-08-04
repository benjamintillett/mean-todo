angular.module('todo',[ 'ngMaterial' ]);

function MainCtrl($http){
	var self = this;

	self.formData = {};

	$http.get('/api/todos/')
		.success(function(data){
			self.todos = data;
			console.log(data);
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
}

angular.module('todo')
	.controller('MainCtrl',MainCtrl)