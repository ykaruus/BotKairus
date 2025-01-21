import { APIButtonComponent, ButtonInteraction, ButtonStyle, ComponentEmojiResolvable, Snowflake } from "discord.js";
import Button from "../Components/Button";




const hello : Button = {
    customid: "hello",
    execute: async (interaction: any) => {
        await interaction.reply("Olá " + interaction.user.username);
    }
}



export default hello;