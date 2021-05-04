import {
    Command,
    CommandMessage,
    Description
} from '@typeit/discord';


export abstract class Setups {

    @Command('setups')
    async setups(command: CommandMessage) {
        command.channel.send('Seleccione setups...');
    }
    
    @Command('craig')
    @Description('Craig A. Williams')
    async craig(command: CommandMessage) {
        command.channel.send('Setups de Craig...');
    }

    @Command('vrs')
    @Description('Virtual Racing School')
    async vrs(command: CommandMessage) {
        command.channel.send('Setups de VRS...');
    }

    @Command('pure')
    @Description('Pure Driving School')
    async pure(command: CommandMessage) {
        command.channel.send('Setups de Pure...');
    }
}