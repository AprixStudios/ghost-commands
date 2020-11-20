var db = require('./database.js');
var fs = require('fs-extra');
const Discord = require('discord.js');

module.exports = client => {
    client.db = new db(client);
    client.commands = new Discord.Collection();
    var commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
    for (let file of commandFiles) {
        let command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }

    try {
        let eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
        for (let file of eventFiles) {
            try {
                let event = require(`./events/${file}`);
                client.on(file.slice(0, -3), event.bind(null, client));
            } catch (error) {
                return console.error(error);
            }
        }
    } catch (error) {
        return console.error(error);
    }
}