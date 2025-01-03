const fs = require("fs").promises;
const path = require("path");
const getAllFiles = require("../utils/getAllFiles");


module.exports = async (client) => {
    try {
        const directory = path.join(__dirname, "..", "commands");
        const commandsPath = await getAllFiles(directory, true);

        for (const folder of commandsPath)
        {
            const subFolderPaths = path.join(directory, folder);
            const commandFiles = (await fs.readdir(subFolderPaths)).filter(file => file.endsWith(".js"));

            console.log("Entrando na pasta : " + subFolderPaths);

            for(const commandFile of commandFiles)
            {
                const commandPath = path.join(subFolderPaths, commandFile);
                const command = require(commandPath);

                if("data" in command && "execute" in command)
                {
                    client.commands.set(command.data.name, command)
                } else {
                    console.warn(`The ${commandFile} not passed, miss "data" or "execute" attribute`);
                }
            }
        }

    } catch (error)
    {
        console.log("Occurred a exception in command handler", error);
    }
}