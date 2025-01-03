const axios = require("axios");
const path = require("path");
const fs = require("fs");
const { getFileCards } = require("../setCards");



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
    }
    return array;
}


class BjManager {
    constructor() {
        this.down_card = {
            "emoji_suit": "card",
            "emoji_id": "1323140435354587168",
            "emoji": "<:card_back:1323140435354587168>",
            "value": 0
        }

        this.playerHand = [];
        this.playerHandValue = 0;

        this.dealerHand = [];
        this.dealerHandValue = 0;
    }
    async shuffle_cards() {
        this.cards = await getFileCards();
        const cardsObj = JSON.parse(this.cards);
        const doubledArray = cardsObj.concat(cardsObj);
        this.shuffledCards = shuffleArray(doubledArray);
    }
    update_value(dealerDeck = false) {
        if (!dealerDeck) {
            this.playerHandValue = this.playerHand.reduce((total, current) => total + current.value, 0);
        } else {
            this.dealerHandValue = this.dealerHand.reduce((total, current) => total + current.value, 0)
        }
    }
    pick_card()
    {
        const r_index = Math.floor(Math.random() * this.shuffledCards.length);
        const random_card = this.shuffledCards[r_index];
        this.shuffledCards.splice(r_index, 1); // remove a carta que foi adquirida do baralho;

        return random_card;
    }
    generate_deck(dealerDeck = false) {
        if (!dealerDeck) {
            this.playerHand.push(this.pick_card(), this.pick_card());
        } else {
            this.dealerHand.push(this.pick_card());
        }
    }
    get_remaining_cards()
    {
        return this.shuffledCards.length;
    }

    format_hand(dealerDeck = false)
    {
        if(!dealerDeck)
        {
            let emoji = "";
            this.playerHand.forEach(card => emoji += card.emoji);

            return emoji
        } else {
            let emoji = "";
            this.dealerHand.forEach(card => emoji += card.emoji)
            return emoji;
        }
    }
    player_push_card()
    {
        this.playerHand.push(this.pick_card());
        this.update_value();
    }

    dealer_push_cards()
    {
        while(this.dealerHandValue < 17)
        {
            this.dealerHand.push(this.pick_card());
            this.update_value(true);
        }
    }
    setAsCardValue(dealerDeck)
    {
        if(!dealerDeck)
        {
            this.playerHand.forEach(card => {
                if(this.playerHandValue > 21 && card.value == 11)
                {
                    this.playerHandValue = this.playerHandValue - 10;
                }
            });
        } else {
            this.dealerHand.forEach(card => {
                if(this.dealerHandValue > 21 && card.value == 11)
                {
                    this.dealerHandValue = this.dealerHandValue - 10;
                }
            });
        }
    }

}


module.exports = {
    BjManager
}
