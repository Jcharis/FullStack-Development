var express = require('express');
var multer = require('multer');

// Initialize the app
var  app = express();
var upload = multer({dest:'public/uploads/'});
 // Ejs
app.set('view engine','ejs');

// Public Folder
app.use(express.static('./public'));

//To Get File
app.get('/',function(req,res){
	res.render('index');
});

// To Upload and Process Any File
app.post('/',upload.any(),function(req,res){
	res.send(req.files);
});





app.listen(3000,function(){
	console.log('Listening on port 3000..');
});