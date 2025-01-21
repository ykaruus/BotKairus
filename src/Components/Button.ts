import { ButtonInteraction} from "discord.js";




interface Button{
    customid : string,
    execute(interaction : ButtonInteraction) : Promise<void>
}




export default Button;