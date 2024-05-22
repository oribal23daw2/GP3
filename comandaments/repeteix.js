module.exports = {
    description: 'Repeteix els arguments donats',
    run: async (message) => {
        const args = message.content.split(' ').slice(1);

        if (args.length < 1) return message.reply('Dona un argument vàlid');

        message.reply(args.join(' '));
    }
}