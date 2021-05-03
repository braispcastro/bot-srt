import dotenv from 'dotenv';
import DiscordBot from './bot';

dotenv.config();

const bot = new DiscordBot();
bot.connect();