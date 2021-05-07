import * as Path from 'path';
import { Client, Command, CommandMessage, Discord, Guard, Once } from '@typeit/discord';
import { NotBot } from './guards/not-bot.guard';


@Discord('!', {
    import: [
        Path.join(__dirname, 'commands', 'setups.js'),
        Path.join(__dirname, 'commands', 'craig.js'),
        Path.join(__dirname, 'commands', 'pure.js'),
        Path.join(__dirname, 'commands', 'vrs.js')
    ]
})
export abstract class DiscordApp {

    @Once('ready')
    ready(client: Client) {
        console.log('Conectado...')
    }

    @Command('ping')
    @Guard(NotBot)
    async ping(command: CommandMessage) {
        command.channel.send('pong');
    }
}
