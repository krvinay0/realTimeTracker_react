const express = require('express');
const app = express();
const path = require('path');
const http = require('http');

const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function (socket) {
    console.log('User connected');

    socket.on('send-location', (coords) => {
        console.log(coords);
        io.emit('receive-location', {id:socket.id,coords});
    })

    // socket.on('disconnect', () => {
    //     console.log('User disconnected');
    // });
});

app.get('/', (req, res) => {
    res.render("index");
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
