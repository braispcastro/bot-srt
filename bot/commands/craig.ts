import path from 'path';
import { Description, Command, CommandMessage } from '@typeit/discord';
import { MessageAttachment } from 'discord.js';
import { getFilesFromDirectory, hasSeasonDirectory } from '../helpers/file-helper';


export abstract class Craig {

    currentPath: string = '';

    @Command('craig :path')
    @Description('Craig A. Williams')
    async craig(command: CommandMessage) {
        if (command.channel.id !== process.env.SETUPS_CHANNEL_ID) return;

        this.getCraigSetupFromPath(command, command.args.path);
    }

    async getCraigSetupFromPath(command: CommandMessage, setupPath: string) {

        this.currentPath = `./setups/craig`;
        const pathArray = setupPath.split('/');
        pathArray.forEach(item => {
            this.currentPath = path.join(this.currentPath, item);
        });

        if (!hasSeasonDirectory(this.currentPath)) {
            this.currentPath = path.join(this.currentPath, process.env.DEFAULT_SEASON!);
        }
        
        const files = getFilesFromDirectory(this.currentPath);
        if (files) {
            files.forEach((file) => command.channel.send(new MessageAttachment(path.join(this.currentPath, file))));
        } else {
            await command.react('❌');
        }
    }

}