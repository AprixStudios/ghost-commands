module.exports = {
    name: "toggle",
    description: "Toggles me.",
    aliases: ["t"],
    usage: "",
    async ghost(client, message, args) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return;
        client.db.get(message.guild.id).then(async res => {
            res.enabled = !res.enabled;
            client.db.save(res);
            return message.channel.send(`Successfully toggled ${res.enabled === true ? "on": "off"}`).catch(err => err);
        });
    }
}