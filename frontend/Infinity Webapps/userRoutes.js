const express = require('express');
const { connectTonWallet, addKoiiWalletAddress, generateReferralLink } = require('../controllers/userController');
const router = express.Router();

router.post('/connectWallet', connectTonWallet);
router.post('/koiiWallet', addKoiiWalletAddress);
router.post('/referral', generateReferralLink);

module.exports = router;
