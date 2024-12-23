const { REST, Routes } = require("discord.js");
const { token, clientId } = require("./secret/secret.json");

const commands = [];
const path = require("node:path");
const fs = require("fs").promises;
const ignore = {
    utils:"utils",
    global_commands:"global_commands"
}



const rest = new REST({version:'10'}).setToken(token);




async function getCommands() {
    const foldersPath = path.join(__dirname, "commands");
    const commandsFolders = await fs.readdir(foldersPath);
    for (const folder of commandsFolders) {
        const commandsPath = path.join(foldersPath, folder);

        console.log(`- Starting validation in ${commandsPath} directory`);
        
        if (commandsPath.endsWith(ignore.utils)) {
            console.log(commandsPath, " - Has utils script, ignoring")
        }
        else if (commandsPath.endsWith(ignore.global_commands)) {
            console.log(`! - The ${commandsPath} files have global commands, ignoring`)
        } else {
            const commandFiles = await fs.readdir(commandsPath);

            for(const file of commandFiles)
            {
                const filePath = path.join(commandsPath, file)
                const command = require(filePath);

                if("data" in command && "execute" in command)
                {
                    console.debug(`The ${filePath} passed in validation`)

                    commands.push(command.data.toJSON());
                } else {
                    console.warn(`The ${filePath} not passed, miss "data" or "execute" attribute`)
                }
            }
        }
    }
}

async function DeployGuildCommands(guildId) {
    try {
        await getCommands();
        console.log(`[+] - starting deploying (/) ${commands.length} commands`)
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {body:commands});
        console.log(`[+] - The (/) ${commands.length} commands has been deployed`)
    } catch (error){
        console.error("DeployGuildCommands -> ocurred a exception : ", error);
        throw error;
    }
}



module.exports = {
    DeployGuildCommands
}