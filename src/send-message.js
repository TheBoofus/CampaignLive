require('dotenv').config();

const {Client, IntentsBitField, EmbedBuilder, ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ], 
})

const roles = [
    {
        id:'1466986894653915146',
        label: 'Green',
    },
    {
        id: '1466986936601149501',
        label: 'Blue',
    },
    {
        id: '1466986955748151460',
        label: 'Red',
    },
]



client.on('ready', async (c) => {
    console.log(`✅${c.user.tag} is online.`);
    try{
        const channel = await client.channels.cache.get('1466619529915404288');
        if (!channel) return;

        const row = new ActionRowBuilder();

        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder()
                .setCustomId(role.id)
                .setLabel(role.label)
                .setStyle(ButtonStyle.Primary)
            );
        });

        await channel.send({
            content: 'Claim or remove role below',
            components: [row],
        });
        process.exit();
    }catch (error) {
        console.log(error);
    }
});



client.login(process.env.TOKEN);