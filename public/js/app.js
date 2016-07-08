var socket = io();

socket.on('connect', function () {
    console.log('Connect to server');
})

socket.on('message', function (message) {
    console.log('New message:');
    console.log(message.text);

});

// Handle submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
    event.preventDefault();

    $message = $form.find('input[name=message]');
    socket.emit('message', {
        text: $message.val()
    });

    $message.val('');

});