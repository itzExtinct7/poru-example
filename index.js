const { Client, Collection, GatewayIntentBits } = require('discord.js');
require("dotenv").config();
const { Poru } = require('poru');
const {Spotify} = require("poru-spotify");
const keepAlive = require(`./server`);

let spotify = new Spotify({
  clientID:"b5ae1640dd414917b0a99c13c5f6a309",
  clientSecret:"0a21b677e8664d25bf65a75d40b3235f"
})


const client = new Client({
  failIfNotExists: true,
  allowedMentions: {
    parse: ['roles', 'users', 'everyone'],
    repliedUser: false,
  },
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
client.config = require('./config.json');
client.poru = new Poru(client, client.config.nodes, {
 library:"discord.js",
 defaultPlatform: "ytsearch",
 plugins: [spotify]
});
client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();

['commands', 'events', 'slash', 'poruEvent'].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});
keepAlive();
client.login(process.env.TOKEN);
