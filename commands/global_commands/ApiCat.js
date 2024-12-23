const { SlashCommandBuilder } = require('@discordjs/builders');
const { ApiRequestManager } = require("../utils/ApiRequest.js");
const { EmbedBuilder } = require('@discordjs/builders');
async function getGirlImages(interaction, user)
{
    try {
        const api = new ApiRequestManager(interaction.user.id);

        const data = await api.getCatGirlImage();
        const embed = new EmbedBuilder();
        embed.setAuthor({ name: "Usado por : " + interaction.user.username, iconURL: interaction.user.avatarURL() });
        embed.setTitle(`Qual imagem combina com ${user.username}?`);
        embed.setDescription("Segundo meus calculos avançados a imagem que mais combina é")
        if(user.id == "922879446275457034")
        {
            embed.setImage("https://i.pinimg.com/736x/98/5b/a8/985ba8d8f36d33dc7196146e7221f239.jpg")
        } else {
            embed.setImage(data.image.original.url);
        }

        await interaction.reply({embeds:[embed]});
    } catch (err)
    {
        await interaction.reply("Aconteceu um erro :" + err);
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('personalidadeimage')
        .setDescription('Descubra a imagem que mais combina com o membro escolhido!')
        .addUserOption(input => {
            input.setName("member")
            input.setDescription("membro alvo")
            input.setRequired(true)
            return input;
        }),
    async execute(interaction) {
        const user = interaction.options.getUser("member");
        await getGirlImages(interaction, user);
    }
}