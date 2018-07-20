// Make connection
var socket = io.connect('http://localhost:4000');

// Query Dom

var message = document.getElementById('message');
	handle = document.getElementById('handle'),
	btn = document.getElementById('send'),
	output = document.getElementById('output'),
	feedback = document.getElementById('feedback');


 // Emit Events

 btn.addEventListener('click',function(){
 	socket.emit('chat',{
 		message:message.value,
 		handle:handle.value
 	});
 });

// Showing Feedback on who is typing
message.addEventListener('keypress',function(){
	socket.emit('typing',handle.value);
});

 // Listen for event changes
 socket.on('chat',function(data){
 	// feedback.innerHTML="";
 	output.innerHTML+='<p><span style="color:blue;font-weight:bolder;"><i class="fas fa-user"></i> '+data.handle+':</span>'+data.message+'</p>';
 });

 // Listen for event changes
 socket.on('typing',function(data){
 	feedback.innerHTML = '<p><em>'+ data +' is typing a message...</em></p>';
 });