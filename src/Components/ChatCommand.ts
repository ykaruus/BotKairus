import { Client, Message } from "discord.js"


interface ChatCommand {
    name: string,
    execute(client : Client, message : Message) : Promise<void>
}





export default ChatCommand;