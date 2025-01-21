import * as path from "path";
import {promises as fs} from "fs"


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



export default getFileCards;