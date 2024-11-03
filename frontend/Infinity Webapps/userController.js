const User = require('./User');

// Connect a TON Wallet for a user
exports.connectTonWallet = async (req, res) => {
    const { userId, walletAddress } = req.body;
    try {
        await User.findOneAndUpdate({ userId }, { walletAddress }, { upsert: true });
        res.json({ message: 'TON Wallet connected successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add or update a KOII Wallet address
exports.addKoiiWalletAddress = async (req, res) => {
    const { userId, koiiWalletAddress } = req.body;
    try {
        await User.findOneAndUpdate({ userId }, { koiiWalletAddress }, { upsert: true });
        res.json({ message: 'KOII Wallet Address added successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Generate a referral link for a user
exports.generateReferralLink = (req, res) => {
    const { userId } = req.body;
    const referralLink = `https://t.me/SmartSocialTaskBot?start=${userId}`;
    res.json({ referralLink });
};
