const { Events } = require("discord.js");


async function getMemberAvatar(client,guildId, memberId) {
    try {
        const guild = await client.guilds.fetch(guildId);
        const member = await guild.members.fetch(memberId);
        const avatarUrl = member.user.displayAvatarURL({ dynamic: true, size: 512 });
        console.log(`Avatar URL: ${avatarUrl}`);
        return avatarUrl;
    } catch (error) {
        console.error('Erro ao buscar o avatar do membro:', error);
    }
}

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(client, message) {
        if (message.author.id == client.user.id) return;

        if (message.content.startsWith("!avatar")) {
            try {
                if(message.mentions.users.size > 0)
                {
                    const mentionedUser = message.mentions.users.first();
                    const avatarUrl = mentionedUser.displayAvatarURL({ dynamic: true, size: 512 })
                    await message.channel.sendTyping();
                    await message.channel.send(`Aqui está o avatar de ${mentionedUser.username}: ${avatarUrl}`);
                } else {
                    const userId = message.content.split(" ")[1];

                    const avatar = await getMemberAvatar(client, message.guild.id, userId);
                    await message.channel.sendTyping();
                    await message.channel.send("Avatar : " + avatar)
                }
            } catch (err) {
                console.log(err);
            }

        }

        if(message.content.startsWith("!emoji_delete"))
        {
            if(message.author.id == "922879446275457034")
            {
                console.log(await message.guild.emojis.cache.get("1322384968181219398"));
            }
        }


    }
}