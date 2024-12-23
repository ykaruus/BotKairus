const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('diz alguma coisa')
        .addStringOption(option => {
            return option.setName("mensagem")
                          .setDescription("A mensagem que você quer que o bot diga")
                          .setRequired(true);
        }),
    async execute(interaction) {
        const mensagem = interaction.options.getString("mensagem", true);
        await interaction.reply(mensagem);
    }
}
