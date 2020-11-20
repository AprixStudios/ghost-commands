const {token,dbuser,dbpass} = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client({ws: {intents: 513}});
const mongoose = require('mongoose');

mongoose.connect(`mongodb://${dbuser}:${dbpass}@localhost:27017/ghostcommands`, {useNewUrlParser: true, useUnifiedTopology: true}).then(console.log(`Database Connected...`)).catch(error => console.error(error));

try {
    let clientvars = require('./clientvars.js');
    clientvars(client);
} catch (error) {
    return console.error(error);
}

client.login(token);