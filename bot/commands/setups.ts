import path from 'path';
import { version } from '../../package.json';
import { Command, CommandMessage } from '@typeit/discord';
import { Message, MessageEmbed, MessageAttachment } from 'discord.js';
import { getNextDirectories, getFilesFromDirectory } from '../helpers/file-helper';


export abstract class Setups {

    currentEmbedId: string = '';
    currentPath: string = '';
    nextDirectories: string[] = [];
    startIndex: number = 0;
    itemsToShow: number = 4;

    constructor() {
        
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
                this.currentEmbedId = message.id;
                this.selectProvider(message);
            })
            .catch((error) => console.log(error));
    }
    async selectProvider(message: Message) {

        message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));

        await message.react('1️⃣');
        await message.react('2️⃣');
        await message.react('3️⃣');

        const filter = (reaction, user) => {
            return ['1️⃣', '2️⃣', '3️⃣'].includes(reaction.emoji.name) 
                && user.id !== message.author.id 
                && message.id === this.currentEmbedId;
        };

        message.awaitReactions(filter, { max: 1 })
            .then(collected => {
                this.startIndex = 0;
                const reaction = collected.first();
                if (reaction?.emoji.name === '1️⃣') {
                    this.currentPath = './setups/craig';
                    this.nextDirectories = getNextDirectories(this.currentPath);
                    this.craigSelectCar(message, '');
                } else if (reaction?.emoji.name === '2️⃣') {
                    this.currentPath = './setups/pure';
                    message.channel.send('Las setups de PURE aún no está disponibles');
                } else if (reaction?.emoji.name === '3️⃣') {
                    this.currentPath = './setups/vrs';
                    message.channel.send('Las setups de VRS aún no está disponibles');
                }
            })
            .catch(error => {
                console.log('error:', error);
            });

    }

    // CRAIG

    async craigSelectCar(message: Message, reactedBy: string) {

        if (reactedBy) {
            const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(reactedBy));
            for (const reaction of userReactions.values()) {
                await reaction.users.remove(reactedBy);
            }
        } else {
            message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
        }

        let carsToShow = '\n';
        const cars = this.nextDirectories.slice(this.startIndex, this.startIndex + this.itemsToShow);
        cars.forEach((car, index) => {
            carsToShow = carsToShow.concat(`${index + 1}.- ${car.toLocaleUpperCase()}\n`);
        });

        message.embeds[0].setTitle('Craig\'s Setup Shop');
        message.embeds[0].setURL('https://craigsetupshop.co.uk/');
        message.embeds[0].setDescription(carsToShow);
        message.embeds[0].fields.splice(0);
        message.embeds[0].addField('Ruta', this.currentPath);
        message.embeds[0].setThumbnail('https://craigsetupshop.co.uk/img/kreg_social_media.jpg');
        message.embeds[0].setFooter(`${this.startIndex / this.itemsToShow + 1}/${Math.ceil(this.nextDirectories.length / this.itemsToShow)}`);
        message.edit(message.embeds[0]);

        let reactionArray: string[] = ['◀️', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '▶️']
        if (!reactedBy) {
            reactionArray.forEach(async(r) => {
                await message.react(r);
            });
        }

        const filter = (reaction, user) => {
            return reactionArray.includes(reaction.emoji.name) 
                && user.id !== message.author.id 
                && message.id === this.currentEmbedId;
        };

        message.awaitReactions(filter, { max: 1 })
            .then((collected) => {
                const reaction = collected.first();
                const userId = reaction!.users.cache.last()!.id;
                if (reaction?.emoji.name === '◀️') {
                    const idx = this.startIndex - this.itemsToShow;
                    this.startIndex = (idx < 0) ? 0 : idx;
                    this.craigSelectCar(message, userId);
                } else if (reaction?.emoji.name === '▶️') {
                    const idx = this.startIndex + this.itemsToShow;
                    this.startIndex = (idx >= this.nextDirectories.length) ? this.startIndex : idx;
                    this.craigSelectCar(message, userId);
                } else if (reaction?.emoji.name === '1️⃣' && cars[0]) {
                    this.currentPath += `/${cars[0]}`;
                    this.nextDirectories = getNextDirectories(this.currentPath);
                    this.startIndex = 0;
                    this.craigSelectCircuit(message, userId);
                } else if (reaction?.emoji.name === '2️⃣' && cars[1]) {
                    this.currentPath += `/${cars[1]}`;
                    this.nextDirectories = getNextDirectories(this.currentPath);
                    this.startIndex = 0;
                    this.craigSelectCircuit(message, userId);
                } else if (reaction?.emoji.name === '3️⃣' && cars[2]) {
                    this.currentPath += `/${cars[2]}`;
                    this.nextDirectories = getNextDirectories(this.currentPath);
                    this.startIndex = 0;
                    this.craigSelectCircuit(message, userId);
                } else if (reaction?.emoji.name === '4️⃣' && cars[3]) {
                    this.currentPath += `/${cars[3]}`;
                    this.nextDirectories = getNextDirectories(this.currentPath);
                    this.startIndex = 0;
                    this.craigSelectCircuit(message, userId);
                }
            })
            .catch(error => {
                console.log('error:', error);
            });
    }

    async craigSelectCircuit(message: Message, reactedBy: string) {

        if (reactedBy) {
            const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(reactedBy));
            for (const reaction of userReactions.values()) {
                await reaction.users.remove(reactedBy);
            }
        } else {
            message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
        }

        let circuitsToShow = '\n';
        const circuits = this.nextDirectories.slice(this.startIndex, this.startIndex + this.itemsToShow);
        circuits.forEach((circuit, index) => {
            circuitsToShow = circuitsToShow.concat(`${index + 1}.- ${circuit}\n`);
        });

        message.embeds[0].setDescription(circuitsToShow);
        message.embeds[0].fields.splice(0);
        message.embeds[0].addField('Ruta', this.currentPath);
        message.embeds[0].setFooter(`${this.startIndex / this.itemsToShow + 1}/${Math.ceil(this.nextDirectories.length / this.itemsToShow)}`);
        message.edit(message.embeds[0]);

        let reactionArray: string[] = ['◀️', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '▶️']
        if (!reactedBy) {
            reactionArray.forEach(async(r) => {
                await message.react(r);
            });
        }

        const filter = (reaction, user) => {
            return reactionArray.includes(reaction.emoji.name) 
                && user.id !== message.author.id 
                && message.id === this.currentEmbedId;
        };

        message.awaitReactions(filter, { max: 1 })
            .then((collected) => {
                const reaction = collected.first();
                const userId = reaction!.users.cache.last()!.id;
                if (reaction?.emoji.name === '◀️') {
                    const idx = this.startIndex - this.itemsToShow;
                    this.startIndex = (idx < 0) ? 0 : idx;
                    this.craigSelectCircuit(message, userId);
                } else if (reaction?.emoji.name === '▶️') {
                    const idx = this.startIndex + this.itemsToShow;
                    this.startIndex = (idx >= this.nextDirectories.length) ? this.startIndex : idx;
                    this.craigSelectCircuit(message, userId);
                } else if (reaction?.emoji.name === '1️⃣' && circuits[0]) {
                    this.currentPath += `/${circuits[0]}`;
                    this.nextDirectories = getNextDirectories(this.currentPath);
                    this.startIndex = 0;
                    this.craigSelectSeason(message, userId);
                } else if (reaction?.emoji.name === '2️⃣' && circuits[1]) {
                    this.currentPath += `/${circuits[1]}`;
                    this.nextDirectories = getNextDirectories(this.currentPath);
                    this.startIndex = 0;
                    this.craigSelectSeason(message, userId);
                } else if (reaction?.emoji.name === '3️⃣' && circuits[2]) {
                    this.currentPath += `/${circuits[2]}`;
                    this.nextDirectories = getNextDirectories(this.currentPath);
                    this.startIndex = 0;
                    this.craigSelectSeason(message, userId);
                } else if (reaction?.emoji.name === '4️⃣' && circuits[3]) {
                    this.currentPath += `/${circuits[3]}`;
                    this.nextDirectories = getNextDirectories(this.currentPath);
                    this.startIndex = 0;
                    this.craigSelectSeason(message, userId);
                }
            })
            .catch(error => {
                console.log('error:', error);
            });

    }

    async craigSelectSeason(message: Message, reactedBy: string) {

        if (reactedBy) {
            const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(reactedBy));
            for (const reaction of userReactions.values()) {
                await reaction.users.remove(reactedBy);
            }
        } else {
            message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
        }

        let seasonsToShow = '\n';
        const seasons = this.nextDirectories.slice(this.startIndex, this.startIndex + this.itemsToShow);

        if (seasons.length == 1) {
            this.currentPath += `/${seasons[0]}`;
            this.sendSetups(message);
            return;
        }

        seasons.forEach((season, index) => {
            seasonsToShow = seasonsToShow.concat(`${index + 1}.- ${season}\n`);
        });

        message.embeds[0].setDescription(seasonsToShow);
        message.embeds[0].fields.splice(0);
        message.embeds[0].addField('Ruta', this.currentPath);
        message.embeds[0].setFooter(`${this.startIndex / this.itemsToShow + 1}/${Math.ceil(this.nextDirectories.length / this.itemsToShow)}`);
        message.edit(message.embeds[0]);

        let reactionArray: string[] = ['◀️', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '▶️']
        if (!reactedBy) {
            reactionArray.forEach(async(r) => {
                await message.react(r);
            });
        }

        const filter = (reaction, user) => {
            return reactionArray.includes(reaction.emoji.name) 
                && user.id !== message.author.id 
                && message.id === this.currentEmbedId;
        };

        message.awaitReactions(filter, { max: 1 })
            .then((collected) => {
                const reaction = collected.first();
                const userId = reaction!.users.cache.last()!.id;
                if (reaction?.emoji.name === '◀️') {
                    const idx = this.startIndex - this.itemsToShow;
                    this.startIndex = (idx < 0) ? 0 : idx;
                    this.craigSelectSeason(message, userId);
                } else if (reaction?.emoji.name === '▶️') {
                    const idx = this.startIndex + this.itemsToShow;
                    this.startIndex = (idx >= this.nextDirectories.length) ? this.startIndex : idx;
                    this.craigSelectSeason(message, userId);
                } else if (reaction?.emoji.name === '1️⃣' && seasons[0]) {
                    this.currentPath += `/${seasons[0]}`;
                    this.sendSetups(message);
                } else if (reaction?.emoji.name === '2️⃣' && seasons[1]) {
                    this.currentPath += `/${seasons[1]}`;
                    this.sendSetups(message);
                } else if (reaction?.emoji.name === '3️⃣' && seasons[2]) {
                    this.currentPath += `/${seasons[2]}`;
                    this.sendSetups(message);
                } else if (reaction?.emoji.name === '4️⃣' && seasons[3]) {
                    this.currentPath += `/${seasons[3]}`;
                    this.sendSetups(message);
                }
            })
            .catch(error => {
                console.log('error:', error);
            });
    }

    private async sendSetups(message: Message) {
        
        const files = getFilesFromDirectory(this.currentPath);

        if (!files) return;

        files.forEach((file) => message.channel.send(new MessageAttachment(path.join(this.currentPath, file))));

        message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
        message.embeds[0].fields.splice(0);
        message.embeds[0].addField('Ruta', this.currentPath);
        message.embeds[0].setDescription('Setup seleccionada correctamente...');
        message.embeds[0].setFooter('');
        message.edit(message.embeds[0]);
    }
}
