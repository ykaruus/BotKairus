const fs = require("fs");
const path = require("path");
const getAllFiles = require("../utils/getAllFiles.js")
module.exports = async (client) => {
    try {

        const eventsPath = path.join(__dirname, "..", "events");

        const eventFiles = await getAllFiles(eventsPath);

        for (const eventFile of eventFiles) {
            if (eventFile.endsWith(".js")) {
                const Event = require(eventFile);

                if("name" in Event && "execute" in Event && "once" in Event)
                {
                    if(Event.once)
                    {
                        client.once(Event.name, async (...args) => await Event.execute(client, ...args))
                    } else {
                        client.on(Event.name, async (...args) => await Event.execute(client, ...args))
                    }
                } else {
                    console.log(`The ${eventFile} miss name,execute,once attributes`)
                }
            } 
        }

    } catch (error) {
        console.error("Exception ocurred at getAllFiles : " + error)
    }
}