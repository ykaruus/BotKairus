const { SlashCommandBuilder } = require('@discordjs/builders');
const { ApiRequestManager } = require("../utils/ApiRequest.js");
const { EmbedBuilder } = require('discord.js');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('dolar')
        .setDescription('Faz uma requisição e pega o preço do dolar atualizado'),
    async execute(interaction) {
        try {
            const api = new ApiRequestManager(interaction.user.id);
            const dolar = await api.getDolarCurrency();
            let color = "#00FF00";
            let giflink = "https://tenor.com/pt-BR/view/faz-o-l-mario-mario-kart-raio-gif-7377643813746743912";

            const embed = new EmbedBuilder()
                .setAuthor({ name: "Usado por : " + interaction.user.username, iconURL: interaction.user.avatarURL() })
                .setTitle("Exibindo cotação atualizada do dólar")
                .setColor(color)
                .setDescription("Informações retiradas da api: https://economia.awesomeapi.com.br/last/USD-BRL")
                .addFields(
                    { name: "Nome", value: dolar.USDBRL.name, inline: true },
                    { name: "Alta", value: dolar.USDBRL.high, inline: true },
                    { name: "Baixa", value: dolar.USDBRL.low, inline: false }
                )
                .setTimestamp();
            

            await interaction.reply({ embeds: [embed] });

        } catch (err) {
            console.log(err);
            await interaction.reply("Não foi possível solicitar a requisição devido ao erro: " + err);
        }
    }
}