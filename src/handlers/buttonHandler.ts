import Button from "../Components/Button";
import getFiles from "../utils/getFiles";
import Log from "../LogManager";
import { Client } from "discord.js";




const getButtons = async (client: Client) => {
    const buttonsPath = await getFiles("buttons");

    for (const buttonPath of buttonsPath) {
        const button: Button = require(buttonPath).default;

        if (!button) {
            new Log().log("warning", `O botão ${buttonPath} não foi exportado devidamente`);
        } else {
            try {
                client.buttons.set(button.customid, button);
                new Log().log("success", `O botão ${buttonPath} foi carregado com sucesso`)
            } catch (err)
            {
                new Log().log("critical", `Aconteceu um erro ao carregar o botão ${buttonPath}\n${err}`)
            }

        }
    }
}




export default getButtons;