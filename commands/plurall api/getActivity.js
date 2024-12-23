const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const {ApiRequestManager} = require("../utils/ApiRequest.js");
const { execute } = require("./getProfile.js");



async function getActivity(interaction, group_id, subId, teacher_person_id, student_person_id)
{
    try {

        const api = new ApiRequestManager(interaction.user.id);
        await api.setAuths();

        if(api.Auth == "no_auth")
        {
            await interaction.reply("Você não tem auths cadastrados")
        } else {
            const activity = await api.getActivity(group_id, subId, teacher_person_id, student_person_id)
            console.log(activity)
            if (!activity || !Array.isArray(activity)) { 
                await interaction.reply("Nenhuma atividade encontrada."); 
                return
            }
            const embeds = [];
            await interaction.channel.sendTyping()
            await interaction.channel.send("Buscando atividades especificadas....")
            for(const material of activity)
            {
                const embed = new EmbedBuilder() 
                .setColor('#0099ff') 
                .setTitle(material.title) 
                .addFields( 
                    { name: 'Subject Name', value: material.subject_name, inline: true }, 
                    { name: 'Teacher Name', value: material.teacher_name, inline: true }, 
                    { name: 'Group Name', value: material.group_name, inline: true }, 
                    { name: 'Students Answered', value: material.students_answered ? 'Yes' : 'No', inline: true }, 
                    { name: 'Scheduled', value: material.scheduled ? 'Yes' : 'No', inline: true }, 
                    { name: 'Restricted', value: material.restricted ? 'Yes' : 'No', inline: true }, 
                    { name: 'Assessment', value: material.assessment ? 'Yes' : 'No', inline: true }, 
                    { name: 'Correction Available', value: material.correction_available, inline: true }, 
                    { name: 'Show Activity Answer', value: material.show_activity_answer ? 'Yes' : 'No', inline: true },
                    { name: 'Activity count', value:material.contents_count.toString(), inline:true}) 
                .setFooter({ text: `Activity ID: ${material.id}` });
                embeds.push(embed)
            }
            for(const embed of embeds)
            {
            
                await interaction.channel.send({embeds:[embed]});
            }
            
        }

    } catch(err)
    {
        console.log(err)
        await interaction.reply("não foi possível realizar a operação devido ao erro : " + err, {ephemeral:true})
    }
}


module.exports = {
    data: new SlashCommandBuilder()
    .setName("getactivity")
    .setDescription("Pega uma atividade especifica usando os parametros especificados")
    .addStringOption(option => {
        option.setName("groupid");
        option.setDescription("Id do grupo de atividades que deseja obter pode pegar esse id usando getactivities");
        option.setRequired(true);

        return option;
    })
    .addStringOption(option => {
        option.setName("subid");
        option.setDescription("Subject id da atividade, também pode pegar usando getactivities");
        option.setRequired(true);

        return option;
    })
    .addStringOption(option => {
        option.setName("teacherid");
        option.setDescription("id do professor, pode pegar usando getcredential");
        option.setRequired(true);

        return option;
    })
    .addStringOption(option => {
        option.setName("studentid");
        option.setDescription("id do aluno, pode pegar usando getcredential");
        option.setRequired(true);

        return option;
    }),
    async execute(interaction)
    {
        const groupId = interaction.options.getString("groupid", true);
        const subId = interaction.options.getString("subid", true);
        const studentId = interaction.options.getString("studentid", true);
        const teacherId = interaction.options.getString("teacherid", true);

        await getActivity(interaction, groupId,subId,teacherId, studentId);
    }
}