
const fs = require('fs');
const path = require('path')

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
