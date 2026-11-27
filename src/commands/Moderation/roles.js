const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const PREFIX = 'x';

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.content.toLowerCase().startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // Mod commands: xaddrole @User RoleName  |  xremoverole @User RoleName
  if (command === 'addrole' || command === 'removerole') {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      return message.reply('You need the **Manage Roles** permission to use this.');
    }

    const target = message.mentions.members.first();
    const roleQuery = args.slice(1).join(' ');
    const role =
      message.mentions.roles.first() ||
      message.guild.roles.cache.find((r) => r.name.toLowerCase() === roleQuery.toLowerCase());

    if (!target || !role) {
      return message.reply(`Usage: \`x${command} @User RoleName\``);
    }

    if (role.position >= message.guild.members.me.roles.highest.position) {
      return message.reply('My role must be higher than the target role.');
    }

    if (command === 'addrole') {
      await target.roles.add(role);
      return message.reply(`Added **${role.name}** to ${target}.`);
    } else {
      await target.roles.remove(role);
      return message.reply(`Removed **${role.name}** from ${target}.`);
    }
  }
});

client.login('MTU3NTExMjc0NzYwNjIyMDkyMw.Gl9E_h.KRVAQZR1hiu_tlBrK_PvjIR3nCsbLmsvMQ5Vv8');

