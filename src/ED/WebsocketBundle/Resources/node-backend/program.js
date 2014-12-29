var http = require('http'),
    express = require('express'),
    app = express(),
    server = app.listen(3017, function(){}),
    io = require('socket.io')(server)
    ;

app.get('/', function (req, res) {
    res.send('Hello World!')
});


io.on('connection', function(socket){
    console.log('listeni cng on *:3000');
    socket.on('messaga', function(msg){
        msg.message = socket.id;
        io.emit('messaga', msg);
        console.log('sent ' + msg.message);
    });
});

//server.listen(3017, function(){
//    console.log('on *:3000');
//});

