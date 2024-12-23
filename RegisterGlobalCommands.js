const {REST, Routes} = require("discord.js");
const {token, clientId} = require("./secret/secret.json");

const commands = [];
const path = require("node:path");
const fs = require("fs");


const foldersPath = path.join(__dirname, "commands");
const commandsFolders = fs.readdirSync(foldersPath);

for(const folder of commandsFolders)
{
    const commandsPath = path.join(foldersPath, folder);
    

    
    if(commandsPath.endsWith("utils"))
    {
        console.log(commandsPath, " Has utils script, ignoring")
    }
    if(commandsPath.endsWith("global_commands"))
    {
        const commandsFiles = fs.readdirSync(commandsPath);

        for(const file of commandsFiles)
        {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);

            if("data" in command && "execute" in command)
            {
                console.log(`The ${filePath} passed`)

                commands.push(command.data.toJSON());
            } else {
                console.log(`The ${filePath} not passed, miss "data" or "execute" attribute`)
            }
        }
    }
}



const rest = new REST({version:'10'}).setToken(token);


(async () => {
    try {
        console.log("starting deploying %d global commmands", commands.length);

        await rest.put(Routes.applicationCommands(clientId), {body:commands})

        console.log("%d global commmands has deployed with sucess", commands.length);
    } catch (err)
    {
        console.error(`error ao tentar deploy nos comandos `, err);
    }
})();