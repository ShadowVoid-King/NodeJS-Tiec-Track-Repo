const EventEmitter = require('node:events');

const eventEmitter = new EventEmitter();

eventEmitter.on('action', () => {
    console.log('event emitted');
});

// eventEmitter.emit('action');

module.exports = eventEmitter;