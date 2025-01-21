import * as path from "path";
import {promises as fs} from "fs";
import  Command from "../Components/Command"
import { Client } from "discord.js";
import Log from "../LogManager";



async function getCommands(client : Client) {
    const commandsPath : string = path.join(__dirname, "..", "commands");
    const commandFiles = await fs.readdir(commandsPath);

    for(const commandFile of commandFiles)
    {
        const commandPath = path.join(commandsPath, commandFile);
        const command :Command = require(commandPath).default;

        if(!command)
        {
            new Log().log("critical", `O comando ${commandFile} não foi exportado devidamente`)
        } else {
            if("data" in command && "execute" in command)
            {
                new Log().log("success", `O comando ${command.data.name} passed.`)

            } else {
                new Log().log("critical", "O comando não possui os atributos data ou execute")
            }
        }
    }

}



export default getCommands;