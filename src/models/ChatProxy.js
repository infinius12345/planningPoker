import EventEmitter from "EventEmitter";
import io from 'socket.io-client';
import Peer from 'peerjs'

const Topics = {
    USER_CONNECTED   : 'user-connected',
    USER_DISCONNECTED: 'user-disconnected',
    USER_MESSAGE     : 'user-message'
};


function ChatProxy(getStories,getSelected,getVotes,getShowVotes) {
    this.EventEmitter = new EventEmitter();
    this._peers = {};
    this.getStories = getStories;
    this.getSelected = getSelected;
    this.getVotes = getVotes;
    this.getShowVotes = getShowVotes;
}
ChatProxy.prototype = Object.create(EventEmitter.prototype);

ChatProxy.prototype.onMessage = function (cb) {

    this.EventEmitter.on(Topics.USER_MESSAGE, cb);
};

ChatProxy.prototype.getUsername = function () {
    return this._username;
};

ChatProxy.prototype.setUsername = function (username) {
    this._username = username;
};

ChatProxy.prototype.onUserConnected = function (cb) {
    this.EventEmitter.on(Topics.USER_CONNECTED, cb);
};

ChatProxy.prototype.onUserDisconnected = function (cb) {
    this.EventEmitter.on(Topics.USER_DISCONNECTED, cb);
};

ChatProxy.prototype.send = function (user, message) {
    this._peers[user].send(message);
};

ChatProxy.prototype.broadcast = function (msg) {
    for (var peer in this._peers) {
        this.send(peer, msg);
    }
};

ChatProxy.prototype.broadcastStories = function () {
    let stories = this.getStories();
    for (var peer in this._peers) {
        this.send(peer, stories);
    }
};

ChatProxy.prototype.broadcastSelected = function () {
    let selected = this.getSelected();
    for (var peer in this._peers) {
        this.send(peer, selected);
    }
};

ChatProxy.prototype.broadcastShowVotes = function () {
    let selected = this.getShowVotes();
    for (var peer in this._peers) {
        this.send(peer, selected);
    }
};

ChatProxy.prototype.broadcastNewVotes = function () {
    let selected = "";
    for (var peer in this._peers) {
        this.send(peer, selected);
    }
};

ChatProxy.prototype.connect = function (username) {
    var self = this;
    this.setUsername(username);

    window.IO = io('http://localhost:3001');
    console.log(window.location.href);
    if(window.location.href === "http://localhost:3000") {
        this.socket = io('http://localhost:3001');
    }
    else{
        let url = window.location.href;
        url = url.slice(0,url.length-2) + "1";
        this.socket = io(url)
    }
    this.socket.on('connect',function() {
        self.socket.on(Topics.USER_CONNECTED, function (userId) {
            //console.log('arguments', arguments);
            if (userId === self.getUsername()) {
                return;
            }

            self._connectTo(userId);
            self.EventEmitter.emit(Topics.USER_CONNECTED, userId);
            console.log('User connected', userId);
        });
        self.socket.on(Topics.USER_DISCONNECTED, function (userId) {
            if (userId === self.getUsername()) {
                return;
            }
            self._disconnectFrom(userId);
            self.EventEmitter.emit(Topics.USER_DISCONNECTED, userId);
            console.log('User disconnected', userId);
        });
    });
    console.log('Connecting with username',username);
    this.peer = new Peer(username,{
        host: window.location.hostname, port: 9000, path: '/chat'
    });
    this.peer.on(Topics.USER_CONNECTED, function (data) {
        console.log('user connected peer', data);
    });

    this.peer.on('open',function(userId){
        self.setUsername(userId);
    });
    this.peer.on('connection',function(conn){
        self._registerPeer(conn.peer,conn);
        self.EventEmitter.emit(Topics.USER_CONNECTED,conn.peer);
    });
};

ChatProxy.prototype._connectTo = function (username) {
    var conn = this.peer.connect(username);
    conn.on('open', function () {
        this._registerPeer(username, conn);
    }.bind(this));
};

ChatProxy.prototype._registerPeer = function (username, conn) {
    console.log('Registering', username);
    this._peers[username] = conn;
    if(this._username === "admin"){
        // let stories = this.getStories();
        // conn.send(stories);
        let stories = this.getStories();
        this.send(username,stories);
        let selected = this.getSelected();
        // conn.send(selected);
        this.send(username,selected);
        //this.send(username,)
    }
    let votes = this.getVotes();
    this.send(username,votes);
    let showVotes = this.getShowVotes();
    this.send(username,showVotes);
    conn.on('data', function (msg) {
        console.log('Messaga received', msg , username);
        this.EventEmitter.emit(Topics.USER_MESSAGE, { inc: msg, author: username });
    }.bind(this));
};

ChatProxy.prototype._disconnectFrom = function (username) {
    delete this._peers[username];
};

export default ChatProxy;