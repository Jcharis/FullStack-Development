var express = require('express');


var app = express();

app.get('/',function(req,res){
	res.send('Hello world this is Express');
});

//Arrow function ()=> 
// app.get('/',(req,res)=>{
// 	res.send('Hello world this is Express');
// });

app.listen(4000,function(){
	console.log("Listing on localhost:4000");
});


