const { Events } = require("discord.js");




module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(client, interaction) {
        if (interaction.isChatInputCommand()) {
            const commandName = interaction.commandName;
            const command = client.commands.get(commandName);

            if (!command) {
                await interaction.reply({ content: `O comando ${interaction.commandName}, não existe`, ephemeral: true });
            }

            try {
                await command.execute(interaction)
            } catch (error) {
                console.error(error)
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'Aconteceu um erro ao executar o comando ' + error, ephemeral: true });
                }
                await interaction.reply({ content: 'Aconteceu um erro ao executar o comando ' + error, ephemeral: true });
            }
        } else if (interaction.isButton()) {
            const buttonName = interaction.customId;
            const button = client.buttons.get(buttonName);
            try {
                if (!button) {
                    await interaction.reply({ content: `O botão ${interaction.customId}, não existe`, ephemeral: true });
                }
                await button.execute(interaction);
            }
            catch(error)
            {
                if(interaction.replied || interaction.deferred)
                {
                    await interaction.channel.send(`${error} occurred in button ${buttonName}`)
                }
                await interaction.channel.send(`${error} occurred in button ${buttonName}`)
            }

            
        }
    }
}