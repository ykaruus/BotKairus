import { authorization } from "../secret/secret.json";
import axios from "axios";
import Log from "../LogManager";

const Routes = {
    AvaliacoesApi: "https://api-avaliacoes.plurall.net/api/auth/me",
}



class PlurallService {
    async getSubId() {
        try {
            const response = await axios.get(Routes.AvaliacoesApi, {
                headers: {
                    "Authorization": `Bearer ${authorization}`
                }
            });


            return response.data;
        } catch (error) {
            new Log().log("critical", `Plurall Service ---> ${error}`)
        }
    }
}




export default PlurallService;