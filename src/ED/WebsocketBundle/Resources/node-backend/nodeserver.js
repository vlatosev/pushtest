
  var app = require('http').createServer(handler)
      , io = require('socket.io').listen(app)
      , fs = require('fs')
      
  var url = require('url');
  var qs = require('querystring');
  // var url_parts = url.parse(request.url, true);
  // var query = url_parts.query;

  app.listen(8001);

  function handler (req, res) {
    if (req.method == 'POST') {
      var body='';
      req.on('data', function (data) {
          body +=data;
      });
      req.on('end',function(){
          var POST = qs.parse(body);
          push_message(POST);
          res.writeHead( 200 );
          // res.write( JSON.stringify( POST ) );  // echoing received data
          res.end();
      });
    }
    else {
      fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) {
          res.writeHead(500);
          return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.end(data);
      });
    }
  }
  
  function furtherparse(post) {
    var receivers = [];
    var data = new Object();
    for (var key in post) {
      if (key.indexOf('recv_id[') != -1) receivers.push(parseInt(post[key]));
      if (key.indexOf('data[') != -1) {
        var datakey = key.substring(5, key.length-1);
        data[datakey] = post[key];
      }
    }
    return {receivers: receivers, data: data};
  }
  
  function push_message(post) {
    var parms = furtherparse(post);
    var receivers = parms.receivers;
    var type = post['type']; // no need for further parsing
    var data = parms.data;
    
    switch (type) {   // different type of messages based on type received
      case 1:
        break;
      default:
        break;
    }
    
    for (var i=0; i<receivers.length; i++) {
      if (userids.indexOf(receivers[i]) != -1) { // user is active somewhere
        var clientids = getClientsByUserId(receivers[i]);
        if (clientids) {
          for (var j=0; j<clientids.length; j++) {
            io.sockets.socket(clientids[j]).emit('notice', { msg: data['msg'] } );
          }
        }
      }
    }
  }

  var userids = [];
  var clients = [];

  function getClientsByUserId(userid) {
    var i = 0;
    var found = false;
    var clientids = false;
    while (!found) {
      found = clients[i].userid == userid;
      if (found) {
        clientids = clients[i].socketid;
      }
      i++;
      if (i >= clients.length) found = true;
    }
    
   console.log(clientids);
   return clientids;
  }  
  
  function getClientsBySocketId(sockid) {
    var i = 0;
    var loop = true;
    while (loop) {
      var found = clients[i].socketid.indexOf(sockid);
      if (found != -1) {
        return clients[i];
        loop = false;
      }
      i++;
      if (i >= clients.length) loop = false;
    }
  }
  
  io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('client', function (data) {
      // socket.emit('notice', { msg: '<a href="#">This client has id: '+socket.id+'</a>' } );

      var allclients = getClientsBySocketId(socket.id);
      for (var i=0; i<allclients.socketid.length; i++) {
        var sockid = allclients.socketid[i];
        io.sockets.socket(sockid).emit('notice', { msg: '<a href="#">This client has id: '+sockid+'</a>' } );
      }
      
    });

    socket.on('clientidentify', function (data) {
      if (userids.indexOf(data.id) == -1) {
        userids.push(data.id);
        clients.push({userid:data.id, socketid:[socket.id]});
      }
      else {
        var i=0;
        var loop = true;
        while (loop) {
          if (clients[i].userid == data.id) {
            if (clients[i].socketid.indexOf(socket.id) == -1) clients[i].socketid.push(socket.id);
            loop = false;
          }
          i++;
          if (i >= clients.length) loop = false;
        }
      }
    });
    
    socket.on('disconnect', function () {
      var i = 0;
      var loop = true;
      while (loop) {
        var found = clients[i].socketid.indexOf(socket.id);
        if (found != -1) {
          clients[i].socketid.splice(found,1);
          if (clients[i].socketid.length == 0) { //last connection
            var userindex = userids.indexOf(clients[i].userid);
            clients.splice(i,1);
            userids.splice(userindex,1);
          }
          loop = false;
        }
        i++;
        if (i >= clients.length) loop = false;
      }
    });
    
  });
