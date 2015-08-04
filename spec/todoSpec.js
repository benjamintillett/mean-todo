var request = require('request');
var mongoose 	= require('mongoose');
var baseUrl = 'http://localhost:8080';
var app = require('../server.js');
var server;
var responseJson;

describe("Todo api",function(){
	beforeAll(function(done) {
    	server = app.listen(8080, function() {
		});
    	done();
  	});

	afterAll(function(done) {
		server.close();
		done();
  	});

  	afterAll(function(done){
		mongoose.connect('mongodb://localhost/todo',function(){
    		mongoose.connection.db.dropDatabase();
		});
		done();
  	});

	describe('GET /apis/todos',function(){
		it('return status code 200',function(done){
			request.get(baseUrl + '/api/todos',function(error,response,body){
				expect(response.statusCode).toEqual(200);
				done();
			});
		});
	});

	describe('post /apis/todos',function(){
		beforeAll(function(done){
			var formData = { text: "whey this is a test thing" };	
			request.post({ url: baseUrl + '/api/todos', form: formData } ,function(error,response,body){
				responseJson = JSON.parse(response.body);
				done();
			});				
		});

		it('creates a new todo',function(done){
			expect(responseJson[0].text).toEqual("whey this is a test thing");
			done();
		});

		it('creates a second todo',function(done){
			var formData = { text: "this is a second todo" };	
			request.post({ url: baseUrl + '/api/todos', form: formData } ,function(error,response,body){
				var responseJson2 = JSON.parse(response.body);
				expect(responseJson2[1].text).toEqual("this is a second todo");
				done();
			});				
		});
	});

	describe('get /apis/todos/:todo_id',function(){
		it('return a todo json for a specified id',function(done){
			var todoId = responseJson[0]._id; 
			request.get(baseUrl + '/api/todos/' + todoId ,function(error,response,body){
				expect(body).toEqual(JSON.stringify(responseJson[0]));
				done();
			});
		});
	});

	describe('delete /apis/todos/:todo_id',function(){
		it('deletes the todo',function(done){
			var todoId = responseJson[0]._id; 
			request.del(baseUrl + '/api/todos/' + todoId ,function(error,response,body){
				request.get(baseUrl + '/api/todos/' + todoId ,function(error,response,body){
					expect(body).toEqual('null');
					done();
				});			
			});


		});
	});

});

