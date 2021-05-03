import { Client } from 'discord.js';

class DiscordBot {

    private client: Client;

    constructor() {
        this.client = new Client();
        this.client.token = process.env.TOKEN!;
    }

    connect() {
        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client?.user?.tag}!`);
        });
        
        this.client.on('message', msg => {
            if (msg.content === 'ping') {
                msg.reply('pong');
            }
        });
        
        this.client.login();
    }

}



export default DiscordBot;