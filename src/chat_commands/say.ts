import { Client, Message } from "discord.js";
import ChatCommand from "../Components/ChatCommand";




const say : ChatCommand = {
    name : "say",

    execute : async (client : Client, message : Message) => {
        const args = message.content.split(" ");


        const opt1 = args.pop();


        await message.reply("opt : " + opt1);
    }
}




export default say;