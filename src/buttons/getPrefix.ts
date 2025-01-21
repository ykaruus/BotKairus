import { ButtonInteraction, Interaction } from "discord.js";
import Button from "../Components/Button";
import CoreService from "../Service/coreService";



const prefix : Button = {
    customid : "prefix",
    execute : async (interaction : ButtonInteraction) => {
        const core = new CoreService(interaction.client);
        await core.getPrefix();



        await interaction.update({content : "requisição feita"})
    }
}



export default prefix;