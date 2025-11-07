const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer();
const socket = new Server(httpServer, { cors: { origin: '*' } });

socket.on('connection', (socket) => {

    socket.on("message", (data) => {
        console.log("Message from client:", data);
    });
    socket.emit("message", "Hello from server!");
});


httpServer.listen(3000, () => {
    console.log('Server is listening on port 3000...');
});  