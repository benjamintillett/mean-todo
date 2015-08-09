
function Todo($resource){
	return $resource('/api/todos/:todoId',{todoId: '@todoId'},{
		query: { method: 'GET', isArray: true }
	});
}

angular.module('todoServices',['ngResource']).factory('Todo',['$resource',Todo]);