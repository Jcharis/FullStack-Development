var express = require('express');
var bodyParser = require('body-parser');


var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.set('view engine','ejs');


app.get('/',function(req,res){
	res.send('Hello world this is Express');
});


//Template and Routing
app.get('/about',(req,res)=>{
	res.sendFile(__dirname + '/about.html');
});

//Using Ejs and Render 
app.get('/articles',(req,res)=>{
res.render('articles');
})

// Adding Params

//Using Ejs and Render 
app.get('/articles/:name',(req,res)=>{
	var data = {topics:['Front-End','Back-End','FullStack','DevOps','SysAdmin']};
res.render('articles',{person:req.params.name,data:data});
})

//Query strings
app.get('/login',(req,res)=>{
	console.log(req.query);
res.render('login',{qs:req.query});
})

//Receive Data From Form
app.get('/signup',function(req,res){
	console.log(req.query);
res.render('signup');
})

// Using Body Parser to Post Form with app.post
app.post('/signup',urlencodedParser,function(req,res){
	console.log(req.body);
res.render('signup-success',{data:req.body});
})


app.listen(4000,function(){
	console.log("Listing on localhost:4000");
});


