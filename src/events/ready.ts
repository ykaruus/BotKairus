import { Client, Events } from "discord.js";
import Event from "../Components/Event";
import Log from "../LogManager";
import CoreService from "../Service/coreService";

const ready : Event = {
    name : Events.ClientReady,
    once: true,
    execute: async (client : Client) => {
        new Log().client_logged(client.user?.username);
        const core = new CoreService(client);

        await core.connect(); // conecta com o servidor.....


    }
}








export default ready;