const { PermissionsBitField } = require('discord.js');

async function handleAddRole(message) {
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

  try {
    await target.roles.add(role);
    return message.reply(`Added **${role.name}** to ${target}.`);
  } catch (err) {
    console.error(err);
    return message.reply('Failed to add role. Check my permissions and role hierarchy.');
  }
}

module.exports = {
  name: 'addrole',
  aliases: ['ar'],
  description: 'Adds a role to a user',
  async execute(...params) {
    const message = params.find((p) => p && p.author && p.guild);
    if (message) return handleAddRole(message);
  },
  async run(...params) {
    const message = params.find((p) => p && p.author && p.guild);
    if (message) return handleAddRole(message);
  },
};

