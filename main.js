const tmi = require('tmi.js');
const config = require('./config')
const chalk = require("chalk");
const colors = new chalk.Instance({ level: 3 });

const opts = {
    connection: {
        reconnect: true,
        secure: true,
    },
    identity: {
        username: "Dai_Kenja",
        password: config.password
    },
    channels: ["katsuhiiko"]
};

const client = new tmi.client(opts)
client.connect();

client.on("chat",(channel, userstate, message, self)=>{
    if (self) return;
    const user = userstate.username;
    const text = message.trim();
    const color = userstate.color
    const nick = colors.hex(color)(`${user}`);
    const arrow = '=>'
    console.log(`${nick} ${arrow} ${text}`);
})
client.on('message', (target, context, msg, self)=>{
    if (self) return;
    const commandName = msg.trim();
    if (commandName === config.prefix + 'dice') {
        const sides = 6;
        let num = Math.floor(Math.random() * sides) + 1;
        client.say(target, ` You rolled => ${num}`)
    }

    if (commandName === config.prefix + 'hi') client.say(target, 'Hello World!');
});
client.on('connected', (addr, port) =>{
    console.log(`* Connected to ${addr}:${port}`);
});
