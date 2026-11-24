const EventEmitter = require('events');

const event = new EventEmitter();

// Creating an event listener
event.on('greet', () => {
    console.log('Hello! Welcome to Node.js');
});

// Triggering the event
event.emit('greet');

// Event Loop demonstration
console.log('Start');

setTimeout(() => {
    console.log('Timeout executed');
}, 0);

setImmediate(() => {
    console.log('Immediate executed');
});

process.nextTick(() => {
    console.log('Next Tick executed');
});

console.log('End');