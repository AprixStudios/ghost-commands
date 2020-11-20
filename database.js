var {db} = require('./db.js');

class Database {
    constructor (client) {
        this.client;
    }
    
    async get(guildId) {
        if (!guildId) throw new SyntaxError("Excuse me, where is the guild id?");
        return new Promise(resolve => {
            db.findOne({
                server: guildId
            }, (err, res) => {
                if (err) return console.error(err);
                if (!res) {
                    res = new db({
                        server: guildId,
                        prefixes: ["!", "?", "-", ".", "+", "$", ">", ":", ";", "*", "s!", "=", "!!", "m!"],
                        enabled: true
                    });
                    return resolve(res);
                } else if (res) {
                    return resolve(res);
                }
            });
        });
    }

    async save(res) {
        if (!res) throw new SyntaxError(`You forgot to add res you dumb.`);
        res.save().catch(err => console.error(err));
    }
}

module.exports = Database;