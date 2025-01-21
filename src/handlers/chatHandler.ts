import * as path from "path";
import {promises as fs} from "fs";
import ChatCommand from "../Components/ChatCommand"
import { Client } from "discord.js";
import Log from "../LogManager";
import getFiles from "../utils/getFiles";



async function getChatCommands(client : Client) {
    const commandFiles = await getFiles("chat_commands");

    for(const commandFile of commandFiles)
    {
        const command : ChatCommand = require(commandFile).default;

        if(!command)
        {
            new Log().log("critical", `O message command ${commandFile} não foi exportado devidamente`)
        } else {
            try
            {
                new Log().log("success", `O message command ${command.name} passed.`);
                client.chat_commands.set(command.name, command);
            } catch(err) {
                new Log().log("critical", `Aconteceu um erro ao carregar o botão ${command.name}\n${err}`)
            }
        }
    }

}



export default getChatCommands;