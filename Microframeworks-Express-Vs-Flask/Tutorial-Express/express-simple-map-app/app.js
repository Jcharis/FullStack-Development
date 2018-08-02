var express = require('express');
var app = express();

app.set('view engine','ejs');


app.get('/',(req,res)=>{
	res.send('Hello World Map with Express')
});


//Using Ejs and Render 
app.get('/maps/:place',(req,res)=>{
		res.render('index',{place:req.params.place});
})


app.listen(4000,function(){
	console.log("Listing on localhost:4000");
});