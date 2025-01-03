const {TOKEN} = require("./secret/openAI.json");

const axios = require("axios")


async function getResponse() {
    try{
        const data = {
            model: "gpt-3.5-turbo", // Usando o modelo correto
            messages: [
                {
                    role: "user", // Indica que a mensagem é do usuário
                    content: "Bom dia, me ajude como explicar a teoria da relatividade para um cavalo"
                }
            ],
            max_tokens: 50,
            temperature: 0.7
        };
    
        const request = await axios.post("https://api.openai.com/v1/completions", JSON.stringify(data), {
            headers:{
                "Authorization":`Bearer ${TOKEN}`,
                "Content-Type":"appplication/json"
        }});
        console.log(request.data)
    } catch(err) {
        console.log(err)
    }
}


getResponse()