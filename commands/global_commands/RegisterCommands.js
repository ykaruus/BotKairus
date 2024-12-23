const {SlashCommandBuilder} = require('@discordjs/builders');
const {DeployGuildCommands} = require("../../RegisterGuildCommands.js")


async function deploy(interaction) {
    try{
        if(interaction.user.id != "922879446275457034") {
            interaction.reply("Tu não é elegivel para usar esse comando");
        } else 
        {
            await DeployGuildCommands(interaction.guildId);
            await interaction.reply("Comandos registrados com sucesso");
        }
    } catch(error)
    {
        if(error == "Error: commands_already_exists")
        {
            await interaction.reply("Os comandos já estão cadastrados no servidor");
        } else {
            await interaction.reply("Vixe, aconteceu um erro " + error);
        }
        
    }
}


module.exports = {
    data : new SlashCommandBuilder()
    .setName("registercommands")
    .setDescription("Registra os todos os comandos do bot no servidor"),
    async execute(interaction)
    {
        await deploy(interaction);
    }

}