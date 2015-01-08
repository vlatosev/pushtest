var http = require('http'),
    express = require('express'),
    app = express(),
    server = app.listen(3017, function(){}),
    io = require('socket.io')(server),
    users = {}
    ;

app.get('/', function (req, res) {
    res.send('Hello Worldxc!')
});

app.post('/', function (req, res) {
    res.send('Hello Worldxc!')
});


io.on('connection', function(socket){
    console.log('new user on *:3000');
    users[socket.id] = socket;
    var rk = socket.request._query;
    var a = 2;
    if(rk.node_cookie == 'yyy')
    {
        socket.on('messaga', function(msg){
            msg.message = socket.id;
            io.emit('messaga', msg);
            console.log('sent ' + msg.message);
        });
    }
    else
    {
        socket.disconnect();
    }
});

//server.listen(3017, function(){
//    console.log('on *:3000');
//});

