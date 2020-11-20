var {MessageEmbed} = require('discord.js');

module.exports = {
    name: "help",
    description: "Get a list of commands",
    aliases: ["h"],
    usage: "",
    async ghost(client, message, args) {
        client.db.get(message.guild.id).then(async res => {
            var embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`You just mention me and it'll run this help command. For the other commands, you gotta actually run them normally.\nCurrently toggled ${res.enabled === true ? "on" : "off"}`)
            for (let command of client.commands.map(cmd => cmd)) {
                embed.addField(`${command.name}`, `**Description**: ${command.description}\n**Aliases**: ${!!command.aliases ? command.aliases.join(' | ') : "none"}\n**Usage**: ${command.name} ${command.usage}`);
            }
            embed.addField(`A Side Project by Aprixia#1033`, `[Discord/Support Server](https://discord.gg/RpM43Gc) | [Fact Of The Day](https://top.gg/bot/690829074465292329)`);
            return message.channel.send(embed).catch(err => err);
        });
    }
}