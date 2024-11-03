const { Telegraf } = require('telegraf');
const User = require('./User');
const { verifyTelegramTask } = require('./verifyController');
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => ctx.reply("Welcome to the Task App! Complete tasks and earn rewards."));

bot.command('referral', async (ctx) => {
    const userId = ctx.from.id;
    const referralLink = `https://t.me/SmartSocialTaskBot?start=${userId}`;
    await ctx.reply(`Share this referral link with friends to earn extra rewards: ${referralLink}`);
});

bot.command('wallet', async (ctx) => {
    const walletAddress = ctx.message.text.split(' ')[1];
    const userId = ctx.from.id;
    if (walletAddress) {
        await User.findOneAndUpdate({ userId }, { walletAddress }, { upsert: true });
        ctx.reply("Your TON Wallet is connected!");
    } else {
        ctx.reply("Please provide a valid wallet address.");
    }
});

bot.on('message', async (ctx) => {
    // Verify Telegram task on message
    const userId = ctx.from.id;
    const message = ctx.message.text;
    const verified = await verifyTelegramTask(userId, message);
    if (verified) ctx.reply("Task verified! Points have been awarded.");
});

module.exports = bot;
