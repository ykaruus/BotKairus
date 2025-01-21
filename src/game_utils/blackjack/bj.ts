import getFileCards from "../setCards";

function shuffleArray(array : any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
    }
    return array;
}

class Bj {
    playerHand: any[];
    playerHandValue : number;
    dealerHand : any[];
    dealerHandValue : number;
    cards : any[];
    shuffledCards : any[];
    constructor()
    {
        this.playerHand = [];
        this.playerHandValue = 0;

        this.dealerHand = [];
        this.dealerHandValue = 0;
        this.cards = [];
        this.shuffledCards = [];
    }
    async shuffle_cards() {
        this.cards.push(await getFileCards());
        const cardsObj = JSON.parse(this.cards[1]);
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
    generate_deck() : void{

        this.playerHand.push(this.pick_card(), this.pick_card());
        this.dealerHand.push(this.pick_card());
    }
    get_remaining_cards() : number
    {
        return this.shuffledCards.length;
    }

    format_hand(dealerDeck : boolean = false, downCard : boolean = true) : string
    {
        if(!dealerDeck)
        {
            let emoji = "";
            this.playerHand.forEach(card => emoji += card.emoji);

            return emoji
        } else {
            let emoji = "";
            this.dealerHand.forEach(card => emoji += card.emoji)
            if(downCard)
            {
                emoji += "<:card_back:1323140435354587168>"
            }
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
    setAsCardValue(dealerDeck : Boolean)
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


export default Bj;