import { Description, Command, CommandMessage } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';


export abstract class Pure {

    @Command('pure')
    @Description('Pure Driving School')
    async pure(command: CommandMessage) {
        if (command.channel.id !== process.env.SETUPS_CHANNEL_ID) return;
        
        const embedMessage = new MessageEmbed({
            color: '#2980b9',
            title: 'Pure Driving School',
            url: 'https://puredrivingschool.com/',
            description: 'Setups from top drivers. We provide great setups for the most popular cars on iRacing! Set up your account now and improve immediately!',
            timestamp: new Date()
        });
        embedMessage.setThumbnail('https://pbs.twimg.com/profile_images/999670635755331584/ho89itYW.jpg');
        command.channel.send(embedMessage);
    }

}