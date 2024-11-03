const axios = require('axios');

const verifyTelegramChannelJoin = async (userId, channelId, botToken) => {
    try {
        const response = await axios.get(`https://api.telegram.org/bot${botToken}/getChatMember`, {
            params: {
                chat_id: channelId,
                user_id: userId
            }
        });
        return response.data && response.data.result && response.data.result.status !== 'left';
    } catch (error) {
        console.error("Error verifying Telegram channel join:", error.message);
        return false;
    }
};

module.exports = {
    verifyTelegramChannelJoin
};
