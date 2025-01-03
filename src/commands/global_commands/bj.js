const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, time } = require("discord.js");
const { BjManager } = require("../../cardsGameService/blackjack/BjManager")



module.exports = {
    data: new SlashCommandBuilder()
        .setName("blackjack")
        .setDescription("A simple blackjack game"),
    async execute(interaction) {
        const userId = interaction.user.id;
        const userInformation = interaction.client.bj_instance.get(userId);
        const customId = "bj"
        const filter = (i) => i.customId == customId && i.user.id == userId;

        if (!userInformation) {
            const bj = new BjManager();
            try {
                await bj.shuffle_cards();
                bj.generate_deck(); // set a player deck
                bj.generate_deck(true); // set a dealer deck

                bj.update_value(); // set a player deck value
                bj.update_value(true); // set a dealer deck value
                

                const embed = new EmbedBuilder()
                    .setAuthor({name:interaction.user.username, iconURL:interaction.user.avatarURL()})
                    .setDescription("Started a blackjack game with good source >:)")
                    .addFields(
                        {
                            name:"Your Hand",
                            value:`${bj.format_hand()} = ${bj.playerHandValue}`,
                            inline: true
                        }, 
                        {
                            name:"Dealer Hand",
                            value:`${bj.format_hand(true)}${bj.down_card.emoji} = ${bj.dealerHandValue}`,
                            inline: true
                        }
                    )
                    .setFooter({text:"Cartas sobrando : " + bj.get_remaining_cards()});
                
                const hit_btn = new ButtonBuilder()
                    .setLabel("Hit")
                    .setCustomId("hit")
                    .setStyle(ButtonStyle.Primary);
                const stand_btn = new ButtonBuilder()
                    .setLabel("Stand")
                    .setCustomId("stand")
                    .setStyle(ButtonStyle.Success);
                const row = new ActionRowBuilder()
                    .setComponents(stand_btn, hit_btn);
                

                interaction.client.bj_instance.set(userId, {bj : bj});
                const message = await interaction.reply({embeds:[embed], components:[row]});

                await message.awaitMessageComponent({ filter, time: 10000 });
                
            } catch (error) {
                
                if(error.code == "InteractionCollectorError"){
                    await interaction.editReply({content: "O jogo foi finalizado por inatividade", embeds : [], components: []});
                    interaction.client.bj_instance.delete(userId);
                } else {
                    console.log(error);
                }
            }
        } else {
            await interaction.reply("Você já tem uma instância de blackjack rodando");
        }

    }


}

