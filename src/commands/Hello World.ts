import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import Command from "../Components/Command";


const hello: Command = {
    data: new SlashCommandBuilder()
        .setName("hello")
        .setDescription("say Hello"),
    execute : async (interaction: CommandInteraction) => {
        await interaction.reply(`Hello ${interaction.user.username}!`)
    }
}


export default hello;