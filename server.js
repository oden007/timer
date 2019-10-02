var express = require('express');
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 7000;

app.use(express.static('js'));
app.use(express.static('css'));

app.get('/' , function(req, res){
    res.sendFile(__dirname+'/index.html');
    //res.sendFile(__dirname+'/time_count.js');
});


http.listen(PORT, function(){
    console.log('server listening. Port:' + PORT);
  });

  /*io.on('connection',function(socket){
    socket.on('message',function(msg){
        console.log('message: ' + msg);
    });
});*/
