var Todo = require('./models/todo');

// api routes 

module.exports = function(app){

	app.get('/api/todos',function(req,res){
		Todo.find(function(err,todos){
			if(err)
				res.send(err)
			res.json(todos);
		});
	});

	app.post('/api/todos',function(req,res){
		Todo.create({
			text: req.body.text,
			done: false
		}, function(err,todo){
			if(err)
				res.send(err);
			res.send(todo);
		});
	});


	app.get('/api/todos/:todo_id',function(req,res){
			Todo.findOne({ _id: req.params.todo_id },function(err,todo){
				if(err)
					res.send(err)
				res.json(todo);
			});
	});

	app.delete('/api/todos/:todo_id',function(req,res){
		Todo.remove({
			_id: req.params.todo_id
		}, function(err,todo){
			if(err)
				res.send(err);
			res.json({});
		})
	});


	// application routes 
	app.get('/material',function(req,res){
		res.sendfile('./public/index.html');
	});

	app.get('/bootstrap',function(req,res){
		res.sendfile('./public/bootstrap-index.html');
	});
}