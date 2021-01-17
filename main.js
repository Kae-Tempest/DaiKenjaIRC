const tmi = require('tmi.js');
const config = require('./config')

const opts = {
    identity: {
        username: "Dai_Kenja",
        password: "oauth:pz0756nq1q0c156duwdwf1j4pjsue2"
    },
    channels: ["katsuhiiko"]
};

const client = new tmi.client(opts)

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();
// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot
    const PREFIX = "!"
    // Remove whitespace from chat message
    const commandName = msg.trim();

    // If the command is known, let's execute it
    if (commandName === config.prefix + 'dice') {
        const sides = 6;
        let num = Math.floor(Math.random() * sides) + 1;
        client.say(target, `You rolled a ${num}`);
    }
    if (commandName === config.prefix + 'hi') client.say(target, 'Hello World!');
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}