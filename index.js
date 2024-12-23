const { Client, Events, GatewayIntentBits, EmbedBuilder, Collection, ActivityType, SlashCommandStringOption } = require('discord.js');
const { token } = require('./secret/secret.json');
const path = require('path');
const fs = require('fs')
process.title = 'BotKairus';

// const {ApiRequestManager} = require('./utils/ApiRequest')
// import {getActivities, getMathActivities} from './utils/BotIntegration.js'
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });
const ignore = {
    utils:"utils",
    global_commands:"global_commands"
}
client.commands = new Collection();
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders)
{
    const commandsPath = path.join(foldersPath, folder);
    

    if(commandsPath.endsWith(ignore.utils))
    {
        console.log(`- The ${commandsPath} directory contains utility files - ignoring`)
    } else {
        const commandFiles = fs.readdirSync(commandsPath);

        for(const file of commandFiles)
        {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);

            if("data" in command && "execute" in command)
            {
                console.log(`- ${filePath} | OK`);
                client.commands.set(command.data.name, command);
            } else {
                console.time
                console.log(`- ${filePath} | ERROR : miss "data" or "execute" attribute`);
            }
        }
    }
}

client.once('ready', () => {
    console.log('Logado como : ' + client.user.username);
    client.user.setPresence({
        activities: [{ name: "There is no spoon - Spoon boy", type: ActivityType.Custom }],
        status: 'idle',
    });
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    console.log(command)

    

    if (!command) {
        await interaction.reply(`O comando ${interaction.commandName}, não existe`, { ephemeral: true });
    }

    try {
        await command.execute(interaction);
    } catch (err) {
        console.error(err)
        if (interaction.replied || interaction.deferred) {
            await interaction.reply('Aconteceu um erro ao executar o comando ' + interaction.commandName)
        }
        await interaction.reply('Aconteceu um erro ao executar o comando ' + err)
    }
})


client.on('messageCreate', async (message) => {
    if (message.author.id == client.user.id) return;
});

client.login(token);









