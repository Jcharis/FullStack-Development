var express = require('express');


var app = express();

app.set('view engine','ejs');

app.get('/',function(req,res){
	res.send('Hello world this is Express');
});

//Arrow function ()=> 
// app.get('/',(req,res)=>{
// 	res.send('Hello world this is Express');
// });

// app.get('/api/languages',(req,res)=>{
// 	res.send([1,2,4,5,6])
// });

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


app.listen(4000,function(){
	console.log("Listing on localhost:4000");
});


