const { Client, Events, GatewayIntentBits, EmbedBuilder, Collection, ActivityType, SlashCommandStringOption, messageLink, ChannelType } = require('discord.js');
const { token } = require('../secret/secret.json');
const path = require('path');
const fs = require('fs');
const eventHandler = require("./handlers/eventHandler.js")
const commandHandler = require('./handlers/commandHandler.js');
const buttonHandler = require('./handlers/buttonHandler.js');
process.title = 'BotKairus';

// const {ApiRequestManager} = require('./utils/ApiRequest')
// import {getActivities, getMathActivities} from './utils/BotIntegration.js'
const client = new Client({ 
    intents: 
    [GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });

client.commands = new Collection();
client.buttons = new Collection();
client.bj_instance = new Collection();
eventHandler(client);
commandHandler(client);
buttonHandler(client);
client.login(token);






