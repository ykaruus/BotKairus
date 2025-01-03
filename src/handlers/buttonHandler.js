const fs = require("fs").promises;
const path = require("path");
const getAllFiles = require("../utils/getAllFiles");


module.exports = async (client) => {
    try {
        const directory = path.join(__dirname, "..", "buttons");
        const buttonPaths = await getAllFiles(directory);
        
        for (const buttonPath of buttonPaths) {
            if (buttonPath.endsWith(".js")) {
                const button = require(buttonPath);

                if("customId" in button && "execute" in button)
                {
                    client.buttons.set(button.customId, button);
                } else {
                    console.log(`The ${buttonPath} miss customId,execute`);
                }
            } 
        }

    } catch (error)
    {
        console.log("Occurred a exception in button handler", error);
    }
}