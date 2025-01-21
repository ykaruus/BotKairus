import { Client, Collection, GatewayIntentBits } from "discord.js";
import {token} from "./secret/secret.json"
import Log from "./LogManager";
import Command from "./Components/Command";
import getCommands from "./handlers/commandHandler";
import getEvents from "./handlers/eventHandler";
import getChatCommands from "./handlers/chatHandler";
import ChatCommand from "./Components/ChatCommand";
import getButtons from "./handlers/buttonHandler";
import Button from "./Components/Button";


const client: Client = new Client({
    intents: [
        GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers
    ]
})


client.commands = new Collection<string, Command>();
client.chat_commands = new Collection<string, ChatCommand>();
client.buttons = new Collection<string, Button>(); 
client.token = "##";






getCommands(client);
getEvents(client);
getChatCommands(client);
getButtons(client);


client.login(token)