import { Command, CommandMessage, Description } from '@typeit/discord';
import { Message, MessageEmbed } from 'discord.js';
import { SetupHelper } from '../services/setup.service';


export abstract class Setups {

    setupHelper: SetupHelper;  

    constructor() {
        this.setupHelper = new SetupHelper();
    }

    @Command('setups')
    async setups(command: CommandMessage) {
        if (command.channel.id !== process.env.SETUPS_CHANNEL_ID) return;

        const embedMessage = new MessageEmbed({
            color: '#f1c40f',
            title: 'Proveedor de setups',
            description: '1.- Craig\'s Setup Shop\n2.- Pure Driving School\n3.- Virtual Racing School',
            timestamp: new Date()
        });

        command.channel.send(embedMessage)
            .then(async(message: Message) => {
                this.setupHelper.currentEmbedId = message.id;
                this.setupHelper.selectProvider(message);
            })
            .catch((error) => console.log(error));
    }

    @Command('craig :path')
    @Description('Craig A. Williams')
    async craig(command: CommandMessage) {
        if (command.channel.id !== process.env.SETUPS_CHANNEL_ID) return;

        this.setupHelper.getCraigSetupFromPath(command, command.args.path);
    }

    @Command('vrs')
    @Description('Virtual Racing School')
    async vrs(command: CommandMessage) {
        if (command.channel.id !== process.env.SETUPS_CHANNEL_ID) return;

        const embedMessage = new MessageEmbed({
            color: '#e74c3c',
            title: 'Virtual Racing School',
            url: 'https://virtualracingschool.com/',
            description: '',
            timestamp: new Date()
        });
        embedMessage.setThumbnail('https://i.imgur.com/QA9o4mT.png');
        command.channel.send(embedMessage);
    }

    @Command('pure')
    @Description('Pure Driving School')
    async pure(command: CommandMessage) {
        if (command.channel.id !== process.env.SETUPS_CHANNEL_ID) return;
        
        const embedMessage = new MessageEmbed({
            color: '#2980b9',
            title: 'Pure Driving School',
            url: 'https://puredrivingschool.com/',
            description: '',
            timestamp: new Date()
        });
        embedMessage.setThumbnail('https://pbs.twimg.com/profile_images/999670635755331584/ho89itYW.jpg');
        command.channel.send(embedMessage);
    }
}
