module.exports = {
    name: "list",
    description: "List the prefixes I am listening to.",
    aliases: ["l"],
    usage: "",
    async ghost(client, message, args) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return;
        client.db.get(message.guild.id).then(async res => {
            return message.channel.send(`Listening to \`${res.prefixes.join('` | `')}\``).catch(err => err);
        });
    }
}