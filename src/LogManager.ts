import * as path from 'path';
import * as fs from "fs"
import  'colors';
class Log {
    format_date() : string {
        const date: Date = new Date();

        return `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`
    }
    log(type : string, message : string){
        if(type == "critical")
        {
            let tamp = "[" + `${type.toUpperCase()}`.red + "]"

            console.log(tamp + " - " + `${message}`);

        } else if(type == "warning")
        {
            let tamp = "[" + `${type.toUpperCase()}`.yellow + "]"

            console.log(tamp + " - " + `${message}`);
        } else if(type == "success")
        {
                let tamp = "[" + `${type.toUpperCase()}`.green + "]"
    
                console.log(tamp + " - " + `${message}`);
        }
    }

    client_logged(username : any){
        let tamp = "[" + `BOT ONLINE`.green + "]"
        console.log(this.format_date().bgWhite.black + " - " + tamp + " " + "online na conta : " + username)
    }
}


export default Log;