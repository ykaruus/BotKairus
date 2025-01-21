import { Client } from "discord.js";
import Log from "../LogManager";
import getFiles from "../utils/getFiles";
import Event from "../Components/Event";


async function getEvents(client : Client) {

    const events = await getFiles("events");
    

    for(const eventPath of events)
    {
        const event : Event = require(eventPath).default;

        if(!event)
        {
            new Log().log("warning", `O evento ${eventPath} não foi devidamente exportado`)
        } else {
            if("name" in event && "once" in event && "execute" in event)
            {
                

                if(event.once)
                {
                    client.once(event.name, async (...args) => await event.execute(client, ...args));
                } else {
                    client.on(event.name, async (...args) => await event.execute(client, ...args));
                }

                new Log().log("success",`O evento ${eventPath} foi carregado com exito...`);
            } else {
                new Log().log("warning", `O evento ${eventPath} não tem os atributos 'name', 'once' ou 'execute'`)
            }
        }
        
    }


}



export default getEvents;