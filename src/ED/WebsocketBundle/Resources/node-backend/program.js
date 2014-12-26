var http = require('http'),
    server = http.createServer(function (req, res) {
      res.writeHead(200);
      res.end('node serverinjo');
    });
//var io = require('socket.io')(3017);
//
//io.on('connection', function(socket){
//  socket.on('connect', function(msg){
//    console.log('listeni cng on *:3000');
//  });
//});

server.listen(3017, 'http://push-local.com');

//server.listen(3017, function(){
//  console.log('listening on *:3000');
//});
