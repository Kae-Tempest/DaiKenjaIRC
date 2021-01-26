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
    let commandNamelist = ['discord','skarab','purple','git','project']
    if (commandName === config.prefix + 'discord') client.say(target, `Lien pour rejoindre mon discord => ${discordLink}`)
    if (commandName === config.prefix + 'skarab') client.say(target, "Va suivre Skarab ou j'te tape Kappa (https://www.twitch.tv/skarab42)")
    if (commandName === config.prefix + 'purple') client.say(target, "Va suivre Purple ou j'te tape Kappa (https://www.twitch.tv/purpleorwel)")
    if (commandName === config.prefix + 'git') client.say(target, 'mon Github => https://github.com/Kae-Tempest')
    if (commandName === config.prefix + 'project') client.say(target, 'Mon project un un RPG, actuellement disponible sur Discord, au futur disponible sur web, mobile et twitch.')
    if (commandName === config.prefix + 'help') client.say(target, `${commandNamelist.join(' || ')}`)
    if (commandName === config.prefix + 'battle') {
        let playerHP = 50;
        let hostileHP = 50;
        for (let i = 1; hostileHP > 0 ; i++) {
            const playerATK = Math.floor(Math.random() + Math.round(11));
            client.say(target, `Tu attaqueras de ${playerATK}`)
            const hostileATK = Math.floor(Math.random() + Math.round(11));
            client.say(target, `Tu attaqueras de ${hostileATK}`)
            const priority = Math.floor(Math.random() + Math.round(1));
            if (priority === 0) {
                playerHP -= hostileATK
                hostileHP -= playerATK
            }
            if (priority === 1) {
                hostileHP -= playerATK
                playerHP -= hostileATK
            }
            if (hostileHP === 0) {
                client.say(target, `Après ${i} tours tu as tué le monstre !`);
            }
            if (playerHP === 0) {
                client.say(target, `Après ${i} tours tu as été tué par le monstre !`)
            }
        }
    }
});
client.on('connected', () => {
    let now = new Date().toLocaleString('fr-FR')
    console.clear()
    console.log('\033[2J')
    console.log(` ${opts.identity.username} connected le ${now}`)
});