const { REST, Routes } = require("discord.js");
const { token, guildId } = require("../../secret/secret.json")
const path = require("path");
const fs = require("fs").promises;



async function getAllCards()
{
    try
    {
        const rest = new REST().setToken(token);
        const emojis = []
        const cards = await rest.get(Routes.guildEmojis("1195418280253468734"));

        for(const card of cards)
        {
            const emoji = `<:${card.name}:${card.id}>`; // // organiza o emoji para facilitar o envio
            const value_content = card.name.split("_")[1];
            const emoji_name = card.name.split("_")[0];
            let value = 0;
            if(value_content == "J" || value_content == "K" || value_content == "Q")  // atribui os valores das cartas
            {
                value = 10;
            } else if(value_content == "A")
            {
                value = 11;
            } else
            {
                value = parseInt(value_content)
            }

            emojis.push(
                {
                    emoji_suit: emoji_name,
                    emoji_id : card.id,
                    emoji : emoji, 
                    value : value
                }
            ) // seta na lista emojis

        }


        return emojis;
    } catch(err)
    {
        console.log("Erro ao obter os emojis : " + err);
    }
}

// cardHeats : ok
// clubs : ok
// spades : ok
// diamonds : ok

async function setAllCards()
{
    try
    {
        const filePath = path.join(__dirname, "cards.json");
        const cards = await getAllCards();

        console.log(JSON.stringify(cards))
    } catch(err)
    {
        console.log(err);
        
    }
}


async function getFileCards()
{
    try {
        const filePath = path.join(__dirname, "cards.json");
        const cards = await fs.readFile(filePath);



        return cards;

    } catch (error) {
        console.log("não foi possivel obter as cartas : " + error)
    }
}



module.exports = {
    getFileCards
}