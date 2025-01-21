import {ButtonStyle, ButtonBuilder, ActionRowBuilder} from "discord.js";
import ChatCommand from "../Components/ChatCommand";



const Hello: ChatCommand = {
    name: "ping",
    execute : async (message : any) => {

        const button = new ButtonBuilder()
            .setLabel("Hello World")
            .setStyle(ButtonStyle.Secondary)
            .setCustomId("prefix");
        const row = new ActionRowBuilder()
            .addComponents(button);

        await message.reply({content: "Hello World", components : [row]})
    }
}



export default Hello;