const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json())
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Adjust for your React app's URL
        methods: ["GET", "POST"]
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);


    socket.on('message', (data) => {
       
        
        console.log('message: ' + data);
        io.emit('receiveMessage', data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

  
});


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});