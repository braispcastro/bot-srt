import { Description, Command, CommandMessage } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';


export abstract class Vrs {

    @Command('vrs')
    @Description('Virtual Racing School')
    async vrs(command: CommandMessage) {
        if (command.channel.id !== process.env.SETUPS_CHANNEL_ID) return;

        const embedMessage = new MessageEmbed({
            color: '#e74c3c',
            title: 'Virtual Racing School',
            url: 'https://virtualracingschool.com/',
            description: 'You can literally learn from the best sim racers in the world, including 4-Time NASCAR iRacing World Champion Ray Alfalla, 3-Time iRacing Grand Prix World Champion Martin Krönke, inaugural iRacing Rally Cross World Champion Mitchell deJong, and other top sim racers.',
            timestamp: new Date()
        });
        embedMessage.setThumbnail('https://i.imgur.com/QA9o4mT.png');
        command.channel.send(embedMessage);
    }

}