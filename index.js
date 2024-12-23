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

    if (message.content.startsWith('!log_plurall') && message.author.id == '922879446275457034') {
        try {
            const api = new ApiRequestManager(message.author.id);
            api.setAuths()
            const user_request = await api.getUserData();

            console.log(user_request);

            if (user_request_status == '200') {
                const user = user_request[0]
                const subId = await api.getSubId();
                const embed = new EmbedBuilder();
                embed.setTitle("Logado na plurall!");
                embed.addFields(
                    { name: 'Nome', value: `${user.name}`, inline: false },
                    { name: 'Email', value: `${user.email}`, inline: false },
                    { name: 'id', value: `${user.externalId}`, inline: false },
                    { name: 'Api Id', value: `${user.id}`, inline: false },
                    { name: 'Sub Id', value: `${subId.sub}`, inline: false },
                );
                embed.setFooter({ text: 'Request Status ' + user_status_request });
                await message.channel.sendTyping();
                await message.channel.send({ embeds: [embed] });

            } else {
                let s = '`status : ' + user_request_status + '`';
                await message.channel.send(`Erro ao se conectar com o servidor da plurall, ${s}`)
            }
        } catch (err) {

            if (err instanceof ReferenceError) {
                await message.channel.send('Aconteceu um erro ao obter as credênciais : ' + err)
            }
            console.log(err);
            await message.channel.send(`Desculpe, não foi realizar sua solitação : ${err}`)
        }

        // const user_request = await api.getUserData();
        // const user_status_request = user_request[1];
        // const user = user_request[0]
        // if (user_status_request == 401 || user == 400) {
        //     await message.channel.send('Erro ao se conector com o servidor plurall - status da requisição ' + user)
        // } else {
        //     
        // }


    }
    if (message.content.startsWith('!auth_keys')) {
        const userID = message.author.id;
        const api = new ApiRequestManager(userID);
        await api.setAuths(); // Certifica-se de que as autorizações estão configuradas 
        const user_auth = await api.Auth;
        if (user_auth == 'no_auth') {
            await message.channel.send(`<@${message.author.id}> você não tem credênciais cadastrados`);
        } else {
            const embed = new EmbedBuilder()
                .setTitle("API CREDENTIAL")
                .addFields({ name: 'Authorization', value: `${user_auth.Authorization}\n`, inline: false },
                    { name: 'Idapplication', value: `${user_auth.idapplication}`, inline: false },
                    { name: 'token', value: `${user_auth.token}`, inline: false });
            await message.author.send({ embeds: [embed] });
            await message.channel.sendTyping();
            await message.channel.send(`<@${message.author.id}> suas credênciais foram enviadas para a dm`);
        } console.log(user_auth);
    }
    if (message.content.startsWith('!atividades')) {
        const userID = message.author.id;
        const api = new ApiRequestManager(userID);
        await api.setAuths(); // Certifica-se de que as autorizações estão configuradas 
        const user_auth = await api.Auth;
        const user_request = await api.getUserData();
        const username = user_request[0];
        const subId = await api.getSubId();
        if (user_auth == 'no_auth') {
            await message.channel.send(`<@${message.author.id}> você não tem credênciais cadastrados`);
        } else {

            const activities_request = await api.getAllActivities(subId.sub);
            const activities_request_status = activities_request[1];
            const activities = activities_request[0];
            console.log(activities, activities_request_status);

            const embed = new EmbedBuilder()
                .setTitle('Atividades')
                .setDescription('Exibindo atividades de ' + username.name);
            await activities.forEach(material => {
                if (material.status == 2 && material.expired_activities == 0) {
                    embed.addFields({
                        name: material.subject.name,
                        value: `Quantidade : *${material.quantity}*\nProf. : ${material.teacher.person.name}\nProf id : ${material.teacher.id}\n`, inline: false
                    });
                }
            });
            await message.channel.sendTyping();
            await message.channel.send({ embeds: [embed] });
        }
    }
    if (message.content.startsWith('!subID')) {
        const api = new ApiRequestManager(message.author.id);
        api.setAuths();

        if (api.Auth == 'no_auth') {
            await message.channel.send(`<@${message.author.id}}> você não tem Auths cadastradas!`)
        } else {
            const user = await api.getSubId()
            const username = user.name;
            const embed = new EmbedBuilder()
                .setTitle('logado na plurall')
                .addFields({
                    name: 'Nome', value: username, inline: false
                },
                    { name: 'subId', value: user.sub, inline: false })
            await message.author.send({ embeds: [embed] })
        }
    }
    if (message.content.includes('caretas')) {
        await message.author.send('https://cdn.discordapp.com/attachments/1225423821545279518/1315888579796537374/31902180-879e-46f6-b228-92b06181f687.png?ex=67604c7d&is=675efafd&hm=9544ba21490e69329c4f656020b6edfbbf5235f8b0f12750aa76d3e7d7d4b95b&')
    }

    if (message.content.startsWith('!setSlashCommands')) {

        try {
            await deploy();
        } catch (error) {
            await message.reply('Não foi possivel realizar a operação devido ao erro : ' + error)
        }
    }
    if (message.content.startsWith('!a') && message.author.id == '922879446275457034') {
        try {
            await message.delete();
            await message.channel.send('https://cdn.discordapp.com/attachments/956723248517775363/1297904685684101120/Screenshot_20241021-084728_WhatsApp.jpg?ex=6762c4ee&is=6761736e&hm=4090917eba1d77c71b2ea62c86393c2be04f3b6bbe4e84e9e20cca2316c6746b&');
        } catch (err) {
            await message.channel.send('Deu certo não : ' + err)
        }

    }

});

client.login(token);









