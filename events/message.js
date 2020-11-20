module.exports = (client, message) => {
    if (message.author.bot) return;
    function commands() {
        var args = message.content.split(/ +/);
        if (!args) return;
        function botPrefix() {
            if (args[0].startsWith('<@') && args[0].endsWith('>')) {
                args[0] = args[0].slice(2,-1);
                if (args[0].startsWith('!')) args[0] = args[0].slice(1);
                if (args[0] === client.user.id) return true;
                else return false;
            } else return false;
        }
        if (botPrefix() === false) return;
        args.shift();
        var commandName = args.shift()?.toLowerCase();
        var command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) command = client.commands.get("help");
        try {
            command.ghost(client, message, args);
        } catch (error) {
            message.channel.send(`Error: ${error.message}`).catch(err => err);
        } finally {
            return;
        }
    }
    function deleteCommand() {
        if (!message.channel.permissionsFor(client.user.id).has("MANAGE_MESSAGES")) return;
        client.db.get(message.guild.id).then(res => {
            if (!res.enabled) return;
            if (!res.prefixes.some(p => message.content.toLowerCase().startsWith(p.toLowerCase()))) return;
            const filter = (m) => {
                return m.author.bot;
            }
            message.channel.awaitMessages(filter, {time: 1000}).then(collected => {
                if (message.deleted) return;
                message.delete().catch(err => err);
            }).catch(err => err);
        });
    }
    commands();
    deleteCommand();
}