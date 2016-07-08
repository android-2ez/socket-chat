var socket = io();

socket.on('connect', function() {
    console.log('Connect to server');
})