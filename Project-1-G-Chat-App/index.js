var express = require('express');
var socket = require('socket.io')

// App setup

var app = express();
var server = app.listen(4000,function(){
	console.log('lisening to request on port 4000');
});

// Static files -create a folder called public
app.use(express.static('public'));



// Socket setup
var io = socket(server);

io.on('connection',function(socket){
	console.log('made socket connect',socket.id);
	//Receiving data from chat.js and front-end
	socket.on('chat',function(data){
		io.sockets.emit('chat',data);
	});
	//For feedback
	socket.on('typing',function(data){
		socket.broadcast.emit('typing',data)
	});
});