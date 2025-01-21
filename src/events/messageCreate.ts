import { Client, Events, Message } from "discord.js";
import Event from "../Components/Event";
import ChatCommand from "../Components/ChatCommand";
import Log from "../LogManager";

const messageCreate: Event = {
    name: Events.MessageCreate,
    once: false,
    execute: async (client : Client, message : any) => {
        const prefix = "$$"
        if(message.author.id == client.user?.id) return;
        if(message.author.bot) return;



        
        if(message.content.startsWith(prefix))
        {
            const commandName = message.content.split(prefix)[1];

            const command = client.chat_commands.get(commandName);


            if(!command)
            {
                await message.reply("Esse não é um comando valido, tente novamente!")
            } else {
                try {
                    await message.channel.sendTyping();
                    await command.execute(message);
                } catch(err)
                {
                    new Log().log("warning", `${err}`)
                }
            }
        }
        else if(message.content == "<@922879446275457034>")
        {
            await message.channel.sendTyping();
            await message.reply("Pare de marca")
            await message.delete()
        }
    }
}



export default messageCreate;