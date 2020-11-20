module.exports = {
    name: "remove",
    description: "Remove a prefix to listen to.",
    aliases: ["r"],
    usage: "<prefix> [prefix2, prefix3, ...]",
    async ghost(client, message, args) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return;
        if (args.length === 0) return message.channel.send(`Successfully removed literally nothing.`);
        client.db.get(message.guild.id).then(async res => {
            var removedPrefixes = [];
            var notEvenAddedPrefixes = [];
            for (let prefix of args) {
                if (!res.prefixes.includes(prefix)) {
                    notEvenAddedPrefixes.push(prefix);
                } else {
                    let index = res.prefixes.indexOf(prefix);
                    res.prefixes.splice(index,1);
                    removedPrefixes.push(prefix);
                }
            }
            if (removedPrefixes.length > 0) client.db.save(res);
            return message.channel.send(`${removedPrefixes.length > 0 ? `Successfully removed \`${removedPrefixes.join('` | `')}\`` : ""}${removedPrefixes.length > 0 && notEvenAddedPrefixes.length > 0 ? " but ": ""}${notEvenAddedPrefixes.length > 0 ? `I couldn't be bothered to remove \`${notEvenAddedPrefixes.join('` | `')}\` because they're not even added` : ""}`).catch(err => err);
        });
    }
}