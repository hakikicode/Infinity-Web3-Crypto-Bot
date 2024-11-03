const twitterClient = require('./twitter');

exports.verifyTwitterTask = async (req, res) => {
    const { userId, tweetId } = req.body;
    try {
        const result = await twitterClient.get(`tweets/${tweetId}`, { expansions: 'author_id' });
        const verified = result.data && result.data.author_id === userId;

        if (verified) {
            // Handle reward points or task completion
            res.status(200).json({ success: true });
        } else {
            res.status(400).json({ success: false, message: "Twitter verification failed" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
