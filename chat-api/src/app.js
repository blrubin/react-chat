import http from 'http';
import express from 'express';
import cors from 'cors';
import io from 'socket.io';
import config from '../config/config.json';
import path from 'path';

// setup server
const app = express();
const server = http.createServer(app);

const socketIo = io(server);
var onlineUsers = [];
var colors = ['#7aa7ef','#ef938b','#9b5f5a','#f4ad6b','#d8bc91','#c8cc70','#7cbc97','#99c6b6','#93b5bc','#7d98c4','#9999c4','#ba99db','#b277ab','#994c7b','#ce869d','#ba5151','#e07c4e','#74965a','#63a88b','#3e8d8e','#3e7ab2','#808cb2','#544972','#b26b8c','#e2a461','#b2bc58','#618e4a']
// Allow CORS
app.use(cors());

// Render a API index page
app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

// Start listening
server.listen(process.env.PORT || config.port);
console.log(`Started on port ${config.port}`);

// Setup socket.io
socketIo.on('connection', socket => {
  const username = socket.handshake.query.username;
  console.log(`${username} connected`);
  var random = Math.floor(Math.random() * 27);
  var color = colors[random];

  var user = {
    username: username,
    userId: socket.id,
    color: color
  };
  onlineUsers.push(user);
  socketIo.emit('server:usersupdated', onlineUsers);
  socket.emit('server:color', color);

  socket.on('client:message', data => {
    console.log(`${data.username}: ${data.message}, ${data.color}`);

    // message received from client, now broadcast it to everyone else
    socket.broadcast.emit('server:message', data);
  });

  socket.on('disconnect', () => {
    console.log(`${username} disconnected`);

    var index = onlineUsers.indexOf(user);
    onlineUsers.splice(index, 1);
    socketIo.emit('server:usersupdated', onlineUsers);

  });
});

export default app;
