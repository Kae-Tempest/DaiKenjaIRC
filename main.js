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
    const arrow = '=>'
    const twoPoints = ':'
    if (userstate.color === null){
        let nick = chalk.yellow(`${user}`)
        console.log(`${channel} ${twoPoints} ${nick} ${arrow} ${text}`);
    } else {
        let color = userstate.color
        let nick = colors.hex(color)(`${user}`);
        console.log(`${channel} ${twoPoints} ${nick} ${arrow} ${text}`);
    }

})

client.on('message', (target, context, msg, self) => {
    if (self) return;
    const commandName = msg.trim();
    const discordLink = 'https://discord.gg/V9t5k5z'
    if (commandName === config.prefix + 'dice') {
        const sides = 6;
        let num = Math.floor(Math.random() * sides) + 1;
        client.say(target, ` You rolled => ${num}`)
    }

    let commandNameList = ['dice','hi','discord','skarab','purple','git','hi skarab','battle','help'];

    if (commandName === config.prefix + 'hi') client.say(target, 'Hello World!');
    if (commandName === config.prefix + 'discord') client.say(target, `Lien pour rejoindre mon discord => ${discordLink}`)
    if (commandName === config.prefix + 'skarab') client.say(target, "Va suivre Skarab ou j'te tape Kappa \n (https://www.twitch.tv/skarab42)")
    if (commandName === config.prefix + 'purple') client.say(target, "Va suivre Purple ou j'te tape Kappa \n (https://www.twitch.tv/purpleorwel)")
    if (commandName === config.prefix + 'git') client.say(target, 'mon Github => https://github.com/Kae-Tempest')
    if (commandName === config.prefix + 'hi Skarab') client.say(target, '!say Salut Skarab')
    if (commandName === config.prefix + 'battle') client.say(target, 'attend je dev ca, laisse moi le temps wesh')
    if(commandName === config.prefix + 'help') client.say(target, `La liste des commandes est : ${(commandNameList).join(' || ')}`)

});
client.on('connected', () => {
    let now = new Date().toLocaleString('fr-FR')
    console.clear()
    console.log('\033[2J')
    console.log(` ${opts.identity.username} connected le ${now}`)
});