const { REST, Routes } = require("discord.js");
const getAllFiles = require("../src/utils/getAllFiles.js");
const { token, clientId } = require("../secret/secret.json")
const fs = require("fs").promises;
const path = require("path");


(async () => {
    const commands = [];
    try {
        const directory = path.join(__dirname, "commands", "global_commands");
        const commandsFile = await getAllFiles(directory);


        for (const file of commandsFile) {
            const command = require(file);
            console.log("Entrando na pasta : " + file);
            if ("data" in command && "execute" in command) {
                commands.push(command.data.toJSON());
            } else {
                console.warn(`The ${file} not passed, miss "data" or "execute" attribute`);
            }

        }
        

        const rest = new REST().setToken(token);

        console.log(`[+] - Starting deploy of ${commands.length} (/) commands`);

        await rest.put(Routes.applicationCommands(clientId), { body: commands });
    } catch (err) {
        console.log(err)
    }
})();