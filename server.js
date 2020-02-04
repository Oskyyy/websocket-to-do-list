const express = require('express');
const path = require('path');
const socket = require('socket.io');
const app = express();
const tasks = [];

const server = app.listen( 8000, () => {
  console.log('Server is runing on Port: 8000');
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

const io = socket(server);

io.on('connection', (socket) => {
  socket.emit('updateData', tasks);


  socket.on('addTask', (taskName) => {
    tasks.push(taskName);
    socket.broadcast.emit('addTask', taskName);
  });

  socket.on('removeTask', (taskName) => {    
    tasks.splice(tasks.indexOf(taskName)); 
    socket.broadcast.emit('removeTask', taskName)
  });
});