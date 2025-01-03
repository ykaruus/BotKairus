const { REST, Routes } = require("discord.js");
const getAllFiles = require("../utils/getAllFiles.js");
const { token, clientId } = require("../../secret/secret.json")
const fs = require("fs").promises;
const path = require("path");


module.exports = async (guildId = "1042477333715628164") => {
    const commands = [];
    const ignore = "global_commands"; // pasta a ser ignorada
    try {
        const directory = path.join(__dirname, "..", "commands");
        const commandsPath = await getAllFiles(directory, true);

        
        for (const folder of commandsPath) {
            const subFolderPaths = path.join(directory, folder);
            console.log("Entrando na pasta : " + subFolderPaths);
            if(subFolderPaths.endsWith(ignore))
            {
                console.log(`${subFolderPaths} -> ignoring`);
            } else {
                const commandFiles = (await fs.readdir(subFolderPaths)).filter(file => file.endsWith(".js"));

                for (const commandFile of commandFiles) {
                    const commandPath = path.join(subFolderPaths, commandFile);
                    const command = require(commandPath);
    
                    if ("data" in command && "execute" in command) {
                        commands.push(command.data.toJSON());
                    } else {
                        console.warn(`The ${commandFile} not passed, miss "data" or "execute" attribute`);
                    }
                }
            }

            


        }

        const rest = new REST().setToken(token);

        console.log(`[+] - Starting deploy of ${commands.length} (/) commands`);

        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {body:commands})
    } catch (err) {
        console.log(err)
    }
}
