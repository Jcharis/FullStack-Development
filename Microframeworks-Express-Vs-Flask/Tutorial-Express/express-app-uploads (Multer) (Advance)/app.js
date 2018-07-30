var express = require('express');
var multer = require('multer');
var path = require('path')
// Initialize the app
var  app = express();
// var upload = multer({dest:'public/uploads/'});
 // Ejs
app.set('view engine','ejs');

// Public Folder
app.use(express.static('./public'));

// Storage Engine
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

//Basic Structure of Storage Function
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {},
//   filename: function (req, file, cb) {} 
// });


// Initialize Upload
var upload = multer({ storage: storage }).single('myfile')

//To Get File
app.get('/',function(req,res){
	res.render('index');
});

// To Upload and Process Any File -Basic
// app.post('/',upload.any(),function(req,res){
// 	res.send(req.files);
// });


// To Upload and Process Any File -Intermediate with Error Message
app.post('/',function(req,res){
	upload(req,res,(err)=>{
		if(err){
			res.render('index',{
				msg:err
			});
		} else{
			if(req.file == undefined){
				res.render('index',{
					msg:'Error: No File Selected!'
				});
			}else{
				res.render('index',{
					msg:'File uploaded!',
					file: `public/uploads/${req.file.filename}`
				});
			}
		}
	});
	
});







app.listen(3000,function(){
	console.log('Listening on port 3000..');
});