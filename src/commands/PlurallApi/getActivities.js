const { SlashCommandBuilder } = require('@discordjs/builders');
const { ApiRequestManager } = require('../../utils/Api/ApiRequest.js');
const { EmbedBuilder } = require("discord.js");



async function getActivities(interaction) {
    try {
        const api = new ApiRequestManager(interaction.user.id);
        await api.setAuths();

        if (api.Auth == "no_auth") {
            await interaction.reply("Você não tem auths cadastrados")
        } else {
            const userSubId_request = await api.getSubId();
            const userSubID = userSubId_request.sub;
            const activities_request = await api.getAllActivities(userSubID);
            const activities = activities_request[0];
            const embed = new EmbedBuilder();
            embed.setTitle("Exibindo suas atividades");
            embed.setDescription("Todas as atividades não respondidas")
            await activities.forEach(material => {
                if (material.status == 2 && material.expired_activities == 0) {
                    embed.addFields({
                        name: material.subject.name,
                        value: `Quantidade : *${material.quantity}*\nProf. : ${material.teacher.person.name}\nProf id : ${material.teacher.person.id}\n`, inline: false
                    },
                        { name: "Id do grupo", value: material.group.id, inline: false },
                        { name: "id do subject", value: material.subject.id, inline: false });
                }
            });
            await interaction.reply({ embeds: [embed], ephemeral: true })
        }

        

    } catch (err) {
        await interaction.reply("Não foi possivel realizar a operação devido ao erro : " + err);
    }
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName("getmyactivities")
        .setDescription("Faz uma requisiçao para a plurall e busca todas as suas atividades"),
    async execute(interaction) {
        await getActivities(interaction);
    }
}