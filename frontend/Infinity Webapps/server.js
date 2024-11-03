require('dotenv').config();
const express = require('express');
const { Telegraf } = require('telegraf');
const axios = require('axios');
const { connectToDatabase, getUserData, updateUserData, boostPoints } = require('./database');

// Initialize Express and Telegraf (Telegram bot)
const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

// Connect to MongoDB
connectToDatabase();

app.use(express.json());

// Endpoint for the frontend to connect TON Wallet
app.post('/wallet/connect', async (req, res) => {
    const { userId, walletAddress } = req.body;
    if (!userId || !walletAddress) {
        return res.status(400).json({ message: "User ID and Wallet Address are required" });
    }

    await updateUserData(userId, { walletAddress });
    res.json({ message: "Wallet connected successfully" });
});

// Endpoint for submitting KOII address
app.post('/add_koii_address', async (req, res) => {
    const { userId, koiiWalletAddress } = req.body;
    if (!userId || !koiiWalletAddress) {
        return res.status(400).json({ message: "User ID and KOII Wallet Address are required" });
    }

    await updateUserData(userId, { koiiWalletAddress });
    res.json({ message: "KOII Wallet Address added successfully" });
});

// Telegram bot command to check in and earn points
bot.command('checkin', async (ctx) => {
    const userId = ctx.from.id;
    const userData = await getUserData(userId);
    
    const now = new Date();
    const lastCheckIn = new Date(userData?.lastCheckIn || 0);
    const timeDiff = now - lastCheckIn;

    if (timeDiff > 24 * 60 * 60 * 1000) {
        await updateUserData(userId, { lastCheckIn: now });
        await boostPoints(userId, 10);
        ctx.reply("You’ve earned 10 points for checking in today!");
    } else {
        ctx.reply("You've already checked in today. Try again tomorrow.");
    }
});

// Telegram bot command to add KOII Wallet Address
bot.command('add_koii_wallet', async (ctx) => {
    const userId = ctx.from.id;
    const walletAddress = ctx.message.text.split(' ')[1];
    
    if (!walletAddress) {
        return ctx.reply("Please provide a valid KOII Wallet address.");
    }

    await updateUserData(userId, { koiiWalletAddress: walletAddress });
    ctx.reply("Your KOII wallet address has been saved successfully.");
});

// Telegram bot command for referral tracking
bot.command('referral', async (ctx) => {
    const userId = ctx.from.id;
    const referralLink = `https://t.me/SmartSocialTaskBot?start=${userId}`;
    ctx.reply(`Share this referral link with friends: ${referralLink}`);
});

// Launch the bot
bot.launch();

// Start Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
