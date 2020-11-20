module.exports = {
    name: "add",
    description: "Add a prefix to listen to.",
    aliases: ["a"],
    usage: "<prefix> [prefix2, prefix3, ...]",
    async ghost(client, message, args) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return;
        if (args.length === 0) return message.channel.send(`Successfully added literally nothing.`);
        client.db.get(message.guild.id).then(async res => {
            var addedPrefixes = [];
            var alreadyAddedPrefixes = [];
            for (let prefix of args) {
                if (res.prefixes.includes(prefix)) {
                    alreadyAddedPrefixes.push(prefix);
                } else {
                    res.prefixes.push(prefix);
                    addedPrefixes.push(prefix);
                }
            }
            if (addedPrefixes.length > 0) client.db.save(res);
            return message.channel.send(`${addedPrefixes.length > 0 ? `Successfully added \`${addedPrefixes.join('` | `')}\`` : ""}${addedPrefixes.length > 0 && alreadyAddedPrefixes.length > 0 ? " but ": ""}${alreadyAddedPrefixes.length > 0 ? `I couldn't be bothered to add \`${alreadyAddedPrefixes.join('` | `')}\` because they're already added` : ""}`).catch(err => err);
        });
    }
}