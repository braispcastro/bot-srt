import { version } from '../../package.json';
import { Description, Command, CommandMessage } from '@typeit/discord';


export abstract class Craig {

    @Command('version')
    @Description('Application Version')
    async version(command: CommandMessage) {
        
        command.channel.send(version);
    }

}