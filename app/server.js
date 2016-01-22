/* global __dirname */
var express = require('express');
var app = express();

var basedir = __dirname + '/public';

app.set('views', './views')
app.set('view engine', 'jade')

app.get('/', function (req, res) {
  res.sendFile('index.html', {'root': basedir});
});

var server = app.listen(8080, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});

var io = require('socket.io')(server);

io.on('connection', function(socket){
	console.log('a user connected');
	
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
	
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

app.use(express.static('public'));