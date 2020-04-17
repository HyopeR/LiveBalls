const socketio = require('socket.io');
const io = socketio();

const socketApi = { };
socketApi.io = io;

const users = [];


io.on('connection', (socket) => {
    console.log('A user connected.');

    socket.on('newUser', (data) => {

        const defaultData = {
            id: socket.id,
            position: {
                x: 0,
                y: 0
            }
        };

        // Object.assign ile Dataları birleştirdik.
        const userData = Object.assign(data, defaultData);
        users.push(userData);
    });

});

module.exports = socketApi;
