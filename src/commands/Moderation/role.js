const { PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'addrole',
  description: 'Adds a role to a user',
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      return message.reply('You need the **Manage Roles** permission to use this.');
    }

    const target = message.mentions.members.first();
    const role = message.mentions.roles.first();

    if (!target || !role) {
      return message.reply('Usage: `xaddrole @User @Role`');
    }

    if (role.position >= message.guild.members.me.roles.highest.position) {
      return message.reply('My role must be higher than the target role.');
    }

    await target.roles.add(role);
    return message.reply(`Added **${role.name}** to ${target}.`);
  },
};


const PREFIX = 'x';

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.content.toLowerCase().startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // --- YOUR OTHER EXISTING COMMANDS CAN GO HERE ---

  // Role commands: xaddrole @User @Role  |  xremoverole @User @Role
  if (command === 'addrole' || command === 'removerole') {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      return message.reply('You need the **Manage Roles** permission to use this.');
    }

    const target = message.mentions.members.first();
    const role = message.mentions.roles.first();

    if (!target || !role) {
      return message.reply(`Usage: \`x${command} @User @Role\``);
    }

    if (role.position >= message.guild.members.me.roles.highest.position) {
      return message.reply('My role must be higher than the target role.');
    }

    try {
      if (command === 'addrole') {
        await target.roles.add(role);
        return message.reply(`Added **${role.name}** to ${target}.`);
      } else {
        await target.roles.remove(role);
        return message.reply(`Removed **${role.name}** from ${target}.`);
      }
    } catch (error) {
      console.error(error);
      return message.reply('Failed to update roles. Check my permissions and role hierarchy.');
    }
  }
});

// Keep your existing login line (either process.env.DISCORD_TOKEN or your token string)
client.login(process.env.MTU3NTExMjc0NzYwNjIyMDkyMw.Gl9E_h.KRVAQZR1hiu_tlBrK_PvjIR3nCsbLmsvMQ5Vv8);
