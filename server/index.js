const Topics = {
    USER_CONNECTED   : 'user-connected',
    USER_DISCONNECTED: 'user-disconnected',
    USER_MESSAGE     : 'user-message'
};

var PeerServer = require('peer').PeerServer,
    express = require('express'),
    app = express(),
    port = process.env.PORT || 3001;

app.use(express.static(__dirname + '/public'));

var expressServer = app.listen(port);
var io = require('socket.io').listen(expressServer);

console.log('Listening on port', port);

var peerServer = new PeerServer({ port:9000, path: '/chat'});

peerServer.on('connection',function(id){
    io.emit(Topics.USER_CONNECTED, id);
    console.log('user connected with #', id);
});

peerServer.on('disconnect', function(id) {
    io.emit(Topics.USER_DISCONNECTED, id);
    console.log('User disconncted wit #', id);
});