const {Events, ActivityType} = require("discord.js");




module.exports = {
    name: Events.ClientReady,
    once: true, 
    async execute(client)
    {
        console.log("Logado como : " + client.user.username);
    }
}