const { ButtonBuilder, ActionRowBuilder, EmbedBuilder, ButtonStyle } = require("discord.js")





function disable_buttons() {
    const stand_button = new ButtonBuilder()
        .setLabel("Stand")
        .setStyle(ButtonStyle.Primary)
        .setCustomId("stand")
        .setDisabled(true);
    const hit_button = new ButtonBuilder()
        .setLabel("Hit")
        .setStyle(ButtonStyle.Danger)
        .setCustomId("hit")
        .setDisabled(true);;
    const row = new ActionRowBuilder()
        .addComponents(stand_button, hit_button);

    return row;
}





module.exports = {
    customId: "stand",
    async execute(interaction) {
        const userInformational = interaction.client.bj_instance.get(interaction.user.id);


        if (userInformational) {
            const bj = userInformational.bj;
            const playerHand = bj.playerHand;
            const playerHandValue = bj.playerHandValue;
            bj.dealer_push_cards();
            bj.setAsCardValue(true);

            const dealerHand = bj.dealerHand;
            const dealerHandValue = bj.dealerHandValue;
            const embed = new EmbedBuilder()
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
                .addFields(
                    {
                        name: "Your Hand",
                        value: `${bj.format_hand()} = ${bj.playerHandValue}`,
                        inline: true
                    },
                    {
                        name: "Dealer Hand",
                        value: `${bj.format_hand(true)} = ${bj.dealerHandValue}`,
                        inline: true
                    }
                )
                .setFooter({ text: "Cartas sobrando : " + bj.get_remaining_cards() });

            if(playerHandValue > dealerHandValue && playerHandValue < 21)
            {
                embed.setColor("Green")
                embed.setDescription(`${interaction.user.username} ganhou!`)
            } else if (playerHandValue == 21)
            {
                embed.setColor("Green")
                embed.setDescription(`${interaction.user.username} ganhou!`)
            } else if (dealerHandValue > 21)
            {
                embed.setColor("Green")
                embed.setDescription(`${interaction.user.username} ganhou!`)
            }

            if(dealerHandValue > playerHandValue && dealerHandValue < 21){
                embed.setColor("Red")
                embed.setDescription(`${interaction.user.username} perdeu!`)
            } else if(dealerHandValue == 21)
            {
                embed.setColor("Red")
                embed.setDescription(`${interaction.user.username} perdeu!`)
            } else if(dealerHandValue == playerHandValue) {
                embed.setColor("Yellow");
                embed.setDescription(`${interaction.user.username} empate`)
            }

            interaction.client.bj_instance.delete(interaction.user.id)
            await interaction.update({embeds: [embed], components: [disable_buttons()]});
        } else {
            return;
        }
    }
}