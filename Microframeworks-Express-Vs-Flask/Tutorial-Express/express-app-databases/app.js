var express = require('express');
var bodyParser = require('body-parser');
// Connecting to the DB
var sqlite3 = require('sqlite3').verbose();

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Create the DB
let db = new sqlite3.Database('myuserdata.db',sqlite3.OPEN_READWRITE, (err) => {
	  if (err) {
	    console.error(err.message);
	  }
	  console.log('Connected to the Users database.');
	});


// Creating a Table of Users
// db.run('CREATE TABLE Users1 (Firstname char(50),Lastname char(50),Email char(50),Password char(50))');

app.set('view engine','ejs');

app.get('/',function(req,res){
res.send('Hello world');
});

app.get('/adduser',(req,res)=>{
	res.render('index')
})

// To Receive Data From Form Input
app.post('/adduser',urlencodedParser,function(req,res){
	console.log(req.body);
	
		//Inserting Data into DB
	  db.run(`INSERT INTO Users1(Firstname,Lastname,Email,Password) VALUES(?,?,?,?)`, req.body.firstname,req.body.lastname,req.body.email,req.body.password, function(err) {
	    if (err) {
	      return console.log(err.message);
	    }
	    // get the last inserted id
	    console.log(`A row has been inserted with rowid ${this.lastID}`);
	  });

	   // close the database connection
  db.close();

	res.send({userdata:req.body})
});

// To Show All Users
app.get('/allusers',function(req,res){
		let sqlquery = `SELECT * FROM Users1`;
		db.all(sqlquery,[],(err, rows ) => {
    // process rows here    

		    if (err) {
		    throw err;
		  }
		    rows.forEach((row) => {
		    console.log(row);
		  });

    // res.send(rows);
    res.render('results',{myresults:rows})
});

		
});

// To Get Individual Data Via Query in URL
app.get('/profile/:firstname',function(req,res){
	    let myqueryparam = req.params.firstname;
		let sqlquery = `SELECT * FROM Users1 WHERE Firstname = ?`;
		
		db.get(sqlquery,[myqueryparam], (err, row) => {
		   // process each row here
		   if (err) {
			    return console.error(err.message);
			  }
			  return row
			    // ? res.send(row)
			    // : console.log(`No playlist found with the id ${myqueryparam}`);
			     ? res.render('profile',{myprofiles:row})
			    : console.log(`No playlist found with the id ${myqueryparam}`);

					});

});

app.listen(4000,function(){
	console.log('Listening on port 4000..');
});



// SYNTAX FOR INSERTING DATA
// db.run(sql, params, function(err){
//   // 
// });


//SYNTAX FOR QUERYING DATA
// db.each(sql,params, (err, result) => {
//    // process each row here
// });