import dotenv from 'dotenv';
import { Client } from "@typeit/discord";

dotenv.config();


const start = async () => {

  const client = new Client({
    classes: [
      `${__dirname}/bot/discord.js`
    ],
    silent: false,
    variablesChar: ":"
  });

  await client.login(process.env.TOKEN!);
  
}

start();