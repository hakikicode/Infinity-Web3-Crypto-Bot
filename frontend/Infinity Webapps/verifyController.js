const twitterClient = require('./twitter');
const { verifyTelegramChannelJoin, verifyInstagramFollow } = require('./telegram');
const User = require('./User');

exports.verifyTwitterTask = async (req, res) => {
    const { userId, tweetId } = req.body;
    try {
        const tweet = await twitterClient.get(`tweets/${tweetId}`, { expansions: 'author_id' });
        if (tweet.data && tweet.data.author_id === userId) {
            await User.findByIdAndUpdate(userId, { $inc: { points: 10 } });
            res.json({ success: true, message: "Twitter task verified" });
        } else {
            res.json({ success: false, message: "Twitter verification failed" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.verifyTelegramTask = async (userId, message) => {
    // Placeholder logic for Telegram task verification
    return message.includes("task completed"); // Replace with real verification
};

exports.verifyInstagramTask = async (req, res) => {
    const { userId, profileId } = req.body;
    const verified = await verifyInstagramFollow(profileId);
    if (verified) {
        await User.findByIdAndUpdate(userId, { $inc: { points: 10 } });
        res.json({ success: true, message: "Instagram task verified" });
    } else {
        res.json({ success: false, message: "Instagram verification failed" });
    }
};
