const { SlashCommandBuilder } = require('@discordjs/builders');
const {ApiRequestManager} = require("../../utils/Api/ApiRequest.js");
const { EmbedBuilder } = require('discord.js');


async function get_sub_id(interaction) {
    try {
        const api = new ApiRequestManager(interaction.user.id);
        await api.setAuths();

        if (api.Auth == "no_auth") {
            await interaction.reply('Você não tem auths cadastrados')


        } else {
            const user_subId = await api.getSubId();
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Plurall Information')
                .setAuthor(
                    {
                        name: 'BotKairus',
                        url: 'https://github.com/ykaruus'
                    })
                .setDescription('Informações capturadas:')
                .addFields({ name: 'Zone Info', value: user_subId.zoneinfo, inline: true },
                    { name: 'Partnership', value: user_subId.partnership, inline: true },
                    { name: 'Sub', value: user_subId.sub, inline: false },
                    { name: 'Phone Number Verified', value: String(user_subId.phone_number_verified.toString()), inline: true },
                    { name: 'Is Adapta', value: user_subId.is_adapta.toString(), inline: true },
                    { name: 'Email Verified', value: user_subId.email_verified.toString(), inline: true },
                    { name: 'Updated At', value: new Date(user_subId.updated_at).toLocaleString('pt-BR'), inline: true },
                    { name: 'Plurall ID', value: user_subId.somos_id, inline: true },
                    { name: 'Locale', value: user_subId.locale, inline: true },
                    { name: 'Name', value: user_subId.name, inline: true })
                .setTimestamp()
                .setFooter({ text: 'Data retrieved by BotKairus' });

            await interaction.reply({ embeds: [embed], ephemeral: true })
        }
    } catch(err)
    {
        await interaction.reply("não foi possível realizar a operação devido ao erro " + err,{ephemeral:true})
    }
    

}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('getmysubid')
        .setDescription('faz uma requisição para a plurall e retorna as credênciais de id (requer keys)'),
    async execute(interaction) {
        await get_sub_id(interaction);
    }
}