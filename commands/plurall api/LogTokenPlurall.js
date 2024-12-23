const { SlashCommandBuilder } = require('@discordjs/builders');
const { ApiRequestManager } = require('../utils/ApiRequest.js');
const { EmbedBuilder } = require('discord.js');


async function log_token(interaction) {
    try 
    {
        const api = new ApiRequestManager(interaction.user.id);
        await api.setAuths();
        if(api.Auth == "no_auth")
        {
            await interaction.reply("Você não tem auths cadastrados");
        } else {
            const user_request = await api.getUserData();
            const user_request_status = user_request[1];
            const user = user_request[0];
            const embed = new EmbedBuilder()
                .setTitle("Logado na plurall")
                .setDescription("Informações da conta :")
                embed.addFields(
                    { name: 'Nome', value: `${user.name}`, inline: false },
                    { name: 'Email', value: `${user.email}`, inline: false },
                    { name: 'id', value: `${user.externalId}`, inline: true},
                    { name: 'Api Id', value: `${user.id}`, inline: true }
                )
                embed.setFooter({ text: 'Status code ' + user_request_status });
            console.log(user)

            await interaction.reply({embeds:[embed], ephemeral:true});
        }
    } catch(err) {
        console.error(err)
        await interaction.reply(err)
    }
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('getcredential')
        .setDescription('faz uma requisição para a plurall e retorna as credênciais, nome, email e etc'),
    async execute(interaction) {
        await log_token(interaction);
    }
}