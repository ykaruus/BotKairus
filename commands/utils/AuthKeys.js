
const fs = require('fs');
const path = require('path')

// export function getPlurallAuthorization1()
// {
//     return "a9f8fa3f3e87ba951dee81e8654e8a01";
// }
// export function getPlurallAuthorization2()
// {
//     return "879acc67abf178e23f63fea6f6a6ac15";
// }

// export function getApplicationId()
// {
//     return "NWRmYzNlOTRkNGQyM2Nm";
// }


class AuthManager {

    async read_file()
    {
        try
        {
            const auth = path.join(__dirname, 'userAuthorizations.json')
            const file = await fs.readFileSync(auth, 'utf-8');
            return JSON.parse(file);
        } catch(err)
        {
            console.error('Error: Auth Manager - read_file: ' + err);
        }
        
    }
    async get_auth_byId(userId)
    {
        try 
        {
            const data = await this.read_file();
            for(const element of data){
                
                if(element.userID == userId && element.auth)
                {
                    console.log(element.auth);
                    
                    return element.auth
                } 
            }
            return 'no_auth'
        } catch(err)
        {
            console.error('Error: Auth Manager - get_auth_byId : ' + err);
        }

    }
    async set_auth(userId, authorization,appid)
    {
        const data = await this.read_file();
        const auth = {
            "userID":userId,
            "auth":{
                "auth":{
                    "Authorization": authorization,
                    "idapplication":appid,
                    "Content-Type": "application/json"
                }
            }
        }
    }
}


module.exports = {
    AuthManager
}