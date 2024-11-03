const User = require('./User');

exports.connectTonWallet = async (req, res) => {
    const { userId, walletAddress } = req.body;
    try {
        await User.findOneAndUpdate({ userId }, { walletAddress }, { upsert: true });
        res.json({ message: 'TON wallet connected successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
