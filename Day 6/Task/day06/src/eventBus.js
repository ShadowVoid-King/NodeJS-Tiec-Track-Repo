// Event Emitter - will be shared across the application

// Make single instance of Event Emitter

// export the event emitter to be used in the application

const EventEmitter = require("node:events");
const eventBus = new EventEmitter();
module.exports = eventBus;