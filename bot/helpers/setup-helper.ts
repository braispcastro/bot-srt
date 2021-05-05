import { Message } from 'discord.js';
import { getNextDirectories } from './file-helper';


export class SetupHelper {

    currentEmbedId: string = '';
    currentPath: string = '';
    nextDirectories: string[] = [];
    startIndex: number = 0;
    itemsToShow: number = 4;

    constructor() {

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
                } else if (reaction?.emoji.name === '3️⃣') {
                    this.currentPath = './setups/vrs';
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

        let carsToShow = '';
        const cars = this.nextDirectories.slice(this.startIndex, this.startIndex + this.itemsToShow);
        cars.forEach((car, index) => {
            carsToShow = carsToShow.concat(`${index + 1}.- ${car}\n`);
        })

        message.embeds[0].setTitle('Craig\'s Setup Shop');
        message.embeds[0].setURL('https://craigsetupshop.co.uk/');
        message.embeds[0].setDescription(carsToShow);
        message.embeds[0].setThumbnail('https://craigsetupshop.co.uk/img/kreg_social_media.jpg');
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
                }
            })
            .catch(error => {
                console.log('error:', error);
            });
    }

    async craigSelectCircuit(message: Message) {

        message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));

    }

    async craigSelectSeason(message: Message) {

        message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));

    }

}