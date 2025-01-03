const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {ApiRequestManager} = require("../../utils/Api/ApiRequest.js");


async function profile(interaction, id) {
    try {
        const api = new ApiRequestManager(interaction.user.id);
        await api.setAuths();

        if (api.Auth == "no_auth") {
            await interaction.reply("Você não tem auths cadastrados")
        } else {

            const profile = await api.getProfileById(id);
            const profile_status = profile[1];

            if(profile_status != 200)
            {
                console.log(profile[0]);
                await interaction.reply(`Os dados do id *${id}* não foram encontrados, tente novamente`)
            } else {
                const userData = profile[0];

                // const embed = new EmbedBuilder();
                // embed.setTitle("Informações obtidas");
                // embed.setDescription("Mostrando informações obtidos do id : " + id);
                // embed.addFields( { name: 'ID', value: userData.id, inline: true }, 
                //     { name: 'Partnership', value: userData.partnership, inline: true }, 
                //     { name: 'External ID', value: userData.external_id, inline: true }, 
                //     { name: 'Blocked', value: userData.blocked ? 'Yes' : 'No', inline: true }, 
                //     { name: 'Zone Info', value: userData.zoneinfo, inline: true }, 
                //     { name: 'Locale', value: userData.locale, inline: true },
                //     { name: 'Name', value: userData.name, inline: false }
                // );

                console.log(userData)
            }
    
            
        }



    } catch (err) {
        await interaction.reply("Não foi possivel realizar a operação devido ao erro : " + err);
    }
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('faz uma requisição para a plurall com o id fornecido e captura informações')
        .addStringOption(input => {
            input.setName("id");
            input.setDescription("Id a ser consultado pelo profile");
            input.setRequired(true);


            return input;
        }),
    async execute(interaction) {
        const id = interaction.options.getString("id", true);

        await profile(interaction, id);
    }
}