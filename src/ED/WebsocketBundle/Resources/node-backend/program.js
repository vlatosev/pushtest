var http = require('http'),
    express = require('express'),
    app = express(),
    router = express.Router(),
    bodyParser = require('body-parser'),
    server = app.listen(3017, function ()
    {
    }),
    io = require('socket.io')(server),
    users = {}
    ;

app.use(bodyParser.json());


router.route('/register-user')
    .post(function (req, res)
    {
      var body = req.body;
      if (req.is('application/json')) {
        res.send(body.message + ' - ' + body.session_id);
      }
      else res.send('Hello Worldxc!');
    });

router.use(function (req, res)
{
  res.send('Not found!')
});

app.use('/', router);

io.on('connection', function (socket)
{
  console.log('new user on *:3000');
  users[socket.id] = socket;
  var rk = socket.request._query;
  var a = 2;
  if (rk.node_cookie == 'yyy') {
    socket.on('messaga', function (msg)
    {
      msg.message = socket.id;
      io.emit('messaga', msg);
      console.log('sent ' + msg.message);
    });
  }
  else {
    socket.disconnect();
  }
});
