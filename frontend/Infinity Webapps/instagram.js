const axios = require('axios');

const verifyInstagramFollow = async (profileId, accessToken) => {
    try {
        const response = await axios.get(`https://graph.instagram.com/${profileId}`, {
            params: {
                access_token: accessToken
            }
        });
        return response.data && response.data.id === profileId;
    } catch (error) {
        console.error("Error verifying Instagram follow:", error.message);
        return false;
    }
};

module.exports = {
    verifyInstagramFollow
};
