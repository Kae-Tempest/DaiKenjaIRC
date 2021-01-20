const tmi = require('tmi.js');
const config = require('./config')
const chalk = require("chalk");
const colors = new chalk.Instance({level: 3});
const opts = {
    connection: {reconnect: true, secure: true,},
    identity: {username: "Dai_Kenja", password: config.password},
    channels: ["katsuhiiko"]
};
const client = new tmi.client(opts)
client.connect();
client.on("chat", (channel, userstate, message, self) => {
    if (self) return;
    const user = userstate.username;
    const text = message.trim();
    const color = userstate.color
    const nick = colors.hex(color)(`${user}`);
    const arrow = '=>'
    console.log(`${channel} ${arrow} ${nick} ${arrow} ${text}`);
})

client.on('message', (target, context, msg, self) => {
    if (self) return;
    const commandName = msg.trim();
    if (commandName === config.prefix + 'dice') {
        const sides = 6;
        let num = Math.floor(Math.random() * sides) + 1;
        client.say(target, ` You rolled => ${num}`)
    }
    if (commandName === config.prefix + 'hi') client.say(target, 'Hello World!');
    const discordLink = 'https://discord.gg/V9t5k5z'
    if (commandName === config.prefix + 'discord') client.say(target, `Lien pour rejoindre mon discord => ${discordLink}`)
    if (commandName === config.prefix + 'skarab') client.say(target, "Va suivre Skarab ou j'te tape Kappa (https://www.twitch.tv/skarab42)")
    if (commandName === config.prefix + 'purple') client.say(target, "Va suivre Purple ou j'te tape Kappa (https://www.twitch.tv/purpleorwel)")
    if (commandName === config.prefix + 'git') client.say(target, 'mon Github => https://github.com/Kae-Tempest')
});
client.on('connected', () => {
    let now = new Date().toLocaleString('fr-FR')
    console.clear()
    console.log('\033[2J')
    console.log(` ${opts.identity.username} connected le ${now}`)
});
