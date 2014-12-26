var http = require('http'),
    express = require('express'),
    app = express()
    ;

app.get('/', function (req, res) {
    res.send('Hello World!')
});

var server = app.listen(3017, function(){}),
    io = require('socket.io')(server)
    ;

io.on('connection', function(socket){
    console.log('listeni cng on *:3000');
    socket.on('messaga', function(msg){
        io.emit('messaga', msg);
        console.log('sent ' + msg.message);
    });
});

//server.listen(3017, function(){
//    console.log('on *:3000');
//});

