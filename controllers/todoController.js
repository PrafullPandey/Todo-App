var bodyParser = require('body-parser');

var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://test:test@ds027345.mlab.com:27345/todo')

//create a schema - blue print for data
var todoschema = new mongoose.Schema({
	item:String
});

//model
var Todo = mongoose.model('Todo',todoschema);

/*
//adding item
var item1 = Todo({item:'get flowers'}).save(function(error){
	if(error)
		throw error;
	console.log('item saved');
});
*/

var data=[{item:'get milk'},{item:'walk dog'},{item: 'study'}];

var urlencodedParser = bodyParser.urlencoded({ extended: false });


module.exports = function(app){
	
	app.get('/todo',function(req,res){
		//get data from mango db and pass to view

		Todo.find({},function(error,data){
			if(error)
				throw error;
			res.render('todo',{todo:data});

		});//empty to find all else an obj for a respective
		

	});

	app.post('/todo',urlencodedParser,function(req,res){
		//get data from the view and pass it to the database
		var newTodo = Todo(req.body).save(function(error,data){
			if(error)
				throw error;
			res.json(data);
		});
		//data.push(req.body);


		//res.json(data);
		
	});

	app.delete('/todo/:item',function(req,res){
		///delete the item from database
		Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(error ,data){
			if(error)
				throw error;
			res.json(data);
		});
		/*data = data.filter(function(todo){
			return todo.item.replace(/ /g ,'-')!==req.params.item ;
			//false then filter out the object
			*/
		});
		//res.json(data);
		
	//});
};