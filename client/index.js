//having address of server
const socket = io('http://localhost:3000');

socket.on('connect', (res) => {
    console.log(res);
});

socket.on('message', (data) => {
    console.log('Message from server:', data);
});
