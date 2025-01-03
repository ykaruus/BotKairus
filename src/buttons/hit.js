const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle} = require("discord.js");





function set_lose_embed(deck, dealer_deck, bj) {
    const userHand = bj.format_hand(deck);
    const userValue = bj.sum_hand(deck);

    const dealerHand = bj.push_card_dealer(dealer_deck);
    const dealerHandValue = bj.sum_hand(dealerHand);
    return new EmbedBuilder()
        .setTitle("Perdeu!")
        .setDescription("usernameaqui perdeu")
        .setColor("#ff0000")
        .addFields(
            { name: "Your hand", value: `${userHand}\nValue ${userValue}`, inline: true },
            { name: "Dealer Hand", value: `${dealerHand}\nValue ${dealerHandValue}`, inline: true }
        );


}


function set_win_embed(deck, dealer_deck, bj) {
    
    const userHand = bj.format_hand(deck);
    const userValue = bj.sum_hand(deck);
    
    dealer_deck.push(bj.push_card_dealer(dealer_deck));
    const dealerHand = bj.format_hand(dealer_deck);
    const dealerHandValue = bj.sum_hand(dealer_deck);
    return new EmbedBuilder()
        .setTitle("Perdeu!")
        .setDescription("usernameaqui perdeu")
        .setColor("#ff0000")
        .addFields(
            { name: "Your hand", value: `${userHand}\nValue ${userValue}`, inline: true },
            { name: "Dealer Hand", value: `${dealerHand}\nValue ${dealerHandValue}`, inline: true }
        );


}

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
    customId: "hit",
    async execute(interaction) {
        const userInformational = interaction.client.bj_instance.get(interaction.user.id);
        try {
            if (userInformational) {
                const bj = userInformational.bj;

                bj.player_push_card();
                bj.update_value();

                bj.setAsCardValue();

                const embed = new EmbedBuilder()
                    .setAuthor({name:interaction.user.username, iconURL:interaction.user.avatarURL()})
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
                
                if (bj.playerHandValue > 21)
                {
                    embed.setColor("#FF0000")
                    embed.setDescription(`${interaction.user.username} estourou`);
                    interaction.client.bj_instance.delete(interaction.user.id);
                    await interaction.update({embeds : [embed], components:[disable_buttons()]});

                }
                else {
                    embed.setColor("#5865F2")
                    embed.setDescription(`${interaction.user.username} pegou uma carta!`);
                    await interaction.update({embeds : [embed]});
                }
                
                
            } else {
                return;
            }
        } catch (error) {
            console.log("Ocorreu um erro ao executar o botão hit : " + error)
            if (interaction.replied || interaction.deferred) {
                await interaction.reply({ content: `${error} occurred in button ${interaction.customId}`, ephemeral: true })
            }
            await interaction.followUp({ content: `${error} occurred in button ${interaction.customId}`, ephemeral: true })
        }
    }
}