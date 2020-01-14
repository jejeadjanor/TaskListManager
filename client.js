const EventEmitter = require('events');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const client = new EventEmitter();
const server = require('./server')(client);
server.on('response', (resp) =>{
    // console.log(`Resp : ${resp}`);
    process.stdout.write('\u001B[2J\u001B[0;0f'); //it clears previous response to give way to the new response
    process.stdout.write(resp);
    process.stdout.write('\n\>');
});

let command, args;
rl.on('line', (input) => {
    // console.log(input);
    [command, ...args] = input.split(' ');
    client.emit('command', command, args);
});