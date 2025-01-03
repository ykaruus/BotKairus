const {SlashCommandBuilder} = require('@discordjs/builders');
const deployHandler = require('../../handlers/deployHandler');


async function deploy(interaction) {
    try{
        if(interaction.user.id != "922879446275457034") {
            interaction.reply("Tu não é elegivel para usar esse comando");
        } else 
        {
            await deployHandler(interaction.guild.id);
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
    .setName("refresh")
    .setDescription("Registra & atualiza todos os comandos ou um comado especifico do bot no servidor do bot no servidor"),
    async execute(interaction)
    {
        await deploy(interaction);
    }

}