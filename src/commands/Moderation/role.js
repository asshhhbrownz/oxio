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
