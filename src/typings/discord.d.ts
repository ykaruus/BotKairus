import { Collection } from 'discord.js';
import { Command } from '../Components/Command';
import { Event } from "../Components/Event"
import { ChatCommand } from '../Components/ChatCommand';
import Button from '../Components/Button';

declare module 'discord.js' {
  export interface Client {
    commands: Collection<string, Command>;
    events : Collection<string, Event>;
    chat_commands : Collection<string, ChatCommand>;
    buttons : Collection<string, Button>;
    token : string;
    prefix : string;
  }
}
