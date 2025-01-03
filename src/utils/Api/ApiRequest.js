const axios = require('axios')
const {AuthManager} = require('./AuthKeys.js')
const authManager = new AuthManager();

class ApiRequestManager {
    constructor(user_id) {
        this.user_id = user_id;
    }

    async setAuths() {
        this.Auth = await authManager.get_auth_byId(this.user_id)
    }

    async getUserData() {
        await this.setAuths(); // Certifica-se de que as autorizações estão configuradas
        try {
            const response = await axios.get('https://api-avaliacoes.plurall.net/api/auth/me', {
                headers: {
                    "Authorization": this.Auth.token,
                }
            });
            return [response.data, response.status];
        } catch (error) {
            console.error(error);
        }
    }




    async getProfileById(id) {
        await this.setAuths(); // Certifica-se de que as autorizações estão configuradas
        try {
            const response = await axios.get(`https://aps.plurall.net:443/api/v11/people/profile/${id}`, {
                headers: {
                    "Authorization": this.Auth.Authorization,
                }
            });
            return [response.data, response.status];
        } catch (error) {
            console.error(error);
        }
    }

    async getSubId() {
        await this.setAuths(); // Certifica-se de que as autorizações estão configuradas
        try {
            const response = await axios.get('https://aps.plurall.net/feanor/userinfo', {
                headers: {
                    "Authorization": this.Auth.Authorization,
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getAllActivities(subId) {
        await this.setAuths(); // Certifica-se de que as autorizações estão configuradas
        try {
            const response = await axios.get(`https://aps.plurall.net/api/activities/v11/sent_activity_students/summaries/by_teacher_group_subject_status?&e=true&l=9999&q=_student._person.id%3D%3D${subId};(status!%3D4;status!%3D7)`, {
                headers:this.Auth
            });
            return [response.data, response.status];
        } catch (error) {
            console.error(error);
        }
    }

    async getActivity(group_id, subId, teacher_person_id, student_person_id) {
        await this.setAuths(); // Certifica-se de que as autorizações estão configuradas
        try {
            const response = await axios.get(`https://aps.plurall.net/api/activities/v11/activities_lists?e=true&l=5&m=with_pending_activities&o=0&q=title%3D%3D**;_group.id%3D%3D${group_id};_subject.id%3D%3D${subId};_teacher._person.id%3D%3D${teacher_person_id};_sent_activities._sent_activity_students._student._person.id%3D%3D${student_person_id}&s=_sent_activities.creation_date-`, {
                headers:this.Auth
            })
            return response.data;
        } catch (err) {
            console.error('ERROR getMathActivities -> ' + err);
        }
    }
    async getCatGirlImage()
    {
        const url = "https://api.nekosia.cat/api/v1/images/catgirl?additionalTags=foxgirl,wolf-girl,tail,girl";

        try {
            const response = await axios.get(url);
            const response_data = response.data;

            return response_data;
        } catch(err)
        {
            console.log(err);
        }
    }
    async getDolarCurrency(){

        const api = "https://economia.awesomeapi.com.br/last/USD-BRL"
        try{
            const data = await axios.get(api)
            return data.data;

        } catch(error)
        {
            console.log(error);
        }
    }
}

module.exports = {
    ApiRequestManager
}