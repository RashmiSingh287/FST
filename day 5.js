
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on("greet", (name) => {
    console.log("Hello, " + name + " Welcome");
});

// exit
myEmitter.on("exit", () => {
    console.log("Program ended.");
});
myEmitter.emit("greet", "Rashmi");
myEmitter.emit("exit");