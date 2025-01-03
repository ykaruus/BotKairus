const { REST, Routes } = require('discord.js');
const { token, clientId, guildId } = require('./secret/secret.json');
const fs = require('fs').promises;
const path = require('path');
const getAllFiles = require('./src/utils/getAllFiles.js');

// Função para converter imagem para base64
async function convertImageToBase64(imagePath) {
    const image = await fs.readFile(imagePath);
    return `data:image/png;base64,${image.toString('base64')}`;
}
async function getEmojis() {
    try {
        const directory = path.join(__dirname, "normal_cards", "individual");
        const emojisPath = await getAllFiles(directory, true);
        const emojis = [];

        for (const emojiPath of emojisPath) {
            const imgPath = path.join(directory, emojiPath);
            if (imgPath.endsWith("card back")) {
                console.log("ignoring")
            } else {
                const imgFiles = await fs.readdir(imgPath);

                for (const imgFile of imgFiles) {
                    const imgname = imgFile.split(".")[0];
                    const imgFilePath = path.join(imgPath, imgFile);

                    emojis.push({ name: imgname, path: imgFilePath });
                }
            }
        }


        return emojis
    } catch (err) {
        console.log("Ocurred a error in emoji handler : " + err);

    }

}
(async () => {

    const emojis = await getEmojis();

    console.log(emojis.length);
    console.log(emojis)

    const rest = new REST({ version: '9' }).setToken(token);

    for (const emoji of emojis) {
        const base64Image = await convertImageToBase64(emoji.path);

        try {
            const response = await rest.post(
                Routes.guildEmojis(guildId),
                {
                    body: {
                        name: emoji.name,
                        image: base64Image
                    }
                }
            );
            console.log(`Emoji criado: ${response.name}`);
        } catch (error) {
            console.error(`Erro ao criar o emoji ${emoji.name}:`, error);
        }
    }
})();
