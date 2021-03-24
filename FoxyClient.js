const { Client } = require('discord.js')
const { token } = require('./src/config/config.json')
const fs = require('fs')

const client = new Client()
const eventFiles = fs.readdirSync('./src/events').filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./src/events/${file}`);
    const eventBind = file.split('.')[0]
    console.info(`${file} Loaded! Bind: ${eventBind}`);
    client.on(eventBind, event.bind(null, client))
}


client.login(token)
