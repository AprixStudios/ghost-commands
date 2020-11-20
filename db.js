var mongoose = require('mongoose');

var dbSchema = new mongoose.Schema({
    server: String,
    prefixes: Array,
    enabled: Boolean
});

var db = mongoose.model("prefixes", dbSchema);

module.exports = {db};