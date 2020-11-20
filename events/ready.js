module.exports = (client) => {
    console.log(`Running!`);
    client.user.setPresence({status: 'invisible'});
}