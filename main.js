const tmi = require('tmi.js');
const config = require('./config')

const opts = {
    identity: {
        username: "Dai_Kenja",
        password: config.password
    },
    channels: ["katsuhiiko"]
};

const client = new tmi.client(opts)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();

function onMessageHandler(target, context, msg, self) {
    if (self) {
        return;
    }
    const commandName = msg.trim();
    if (commandName === config.prefix + 'dice') {
            const sides = 6;
            let num = Math.floor(Math.random() * sides) + 1;
            client.say(target, ` You rolled => ${num}`)
    }

    if (commandName === config.prefix + 'hi')client.say(target, 'Hello World!');
}

function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}
