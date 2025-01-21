
import { EmbedBuilder } from "@discordjs/builders";
import ChatCommand from "../Components/ChatCommand";
import PlurallService from "../Service/PlurallService";



const reconnect: ChatCommand = {
    name: "plurall",
    execute: async (message: any) => {
        const plurall = new PlurallService()
        const userinfo = await plurall.getSubId();

        const embed = new EmbedBuilder()
            .setTitle("Informação do usuario")
            .addFields({
                name: "id",
                value: userinfo.id,
                inline: false
                },
                {
                    name: "Nome Completo",
                    value: userinfo.name,
                    inline: false
                },
                {
                    name: "Email",
                    value: userinfo.email,
                    inline: false
                },
                {
                    name: "Conta Criada há",
                    value: userinfo.createdAt,
                    inline: false
                },
                {
                    name: "Conta Criada por",
                    value: userinfo.createdBy,
                    inline: false
                },
                {
                    name: "Ultimo Acesso",
                    value: userinfo.updatedAt,
                    inline: false
                },
                {
                    name: "Id Externo",
                    value: userinfo.externalId,
                    inline: false
                }

            )
            .setColor(0x800080)
            .setFooter({ text: "informação obtida atráves do Bot Kairus" });



        await message.reply({ embeds:[embed] })
    }
}



export default reconnect;