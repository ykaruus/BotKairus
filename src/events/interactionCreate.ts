import Event  from "../Components/Event";
import { Events, Interaction, Collection, CommandInteraction, Client } from "discord.js";
import Log from "../LogManager";




const interactionCreate: Event = {
    name: Events.InteractionCreate,
    once: false,
    execute: async (client : Client, interaction : Interaction) => {
        try {
            if(interaction.isButton())
            {
                const button = client.buttons.get(interaction.customId);

                if(!button)
                {
                    new Log().log("warning", "O botão pressionado não existe!");
                    await interaction.update("Botão pressionado não foi carregado!")
                }

                await button?.execute(interaction)
            } 
            if(interaction.isCommand())
            {
                const command = client.commands.get(interaction.commandName);

                if(!command)
                {
                    new Log().log("warning", "O comando usado não existe!");
                    await interaction.reply("Sorry, but this commmand is disabled.")
                }


                await command.execute(interaction)
            }
        } catch(err)
        {
            new Log().log("critical", `aconteceu o erro no Event.InteractionCreate : ${err}`)
        }
    }
}

export default interactionCreate;