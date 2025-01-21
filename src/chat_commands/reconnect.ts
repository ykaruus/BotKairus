import {ButtonStyle, ButtonBuilder, ActionRowBuilder, Client} from "discord.js";
import ChatCommand from "../Components/ChatCommand";



const reconnect: ChatCommand = {
    name: "conectar",
    execute : async (message : any) => {

        await message.reply({content: `Conectado! prefixo`})
    }
}



export default reconnect;