var name = getQueryVariable('name');
var room = getQueryVariable('room');
var socket = io();

console.log(name + 'wants to joins' + room);

var $roomtitle = jQuery('.room-title').text(room);

socket.on('connect', function () {
    console.log('Connect to server');
    socket.emit('joinRoom', {
        name: name,
        room: room
    });
})

socket.on('message', function (message) {
    var momentTimestamp = moment.utc(message.timestamp);
    var $message = jQuery('.messages');
    console.log('New message:');
    console.log(message.text);

    $message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm a') + '</strong></p>');
    $message.append('<p>' + message.text + '</p>');
});

// Handle submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
    event.preventDefault();

    $message = $form.find('input[name=message]');
    socket.emit('message', {
        name: name,
        text: $message.val()
    });

    $message.val('');

});