const express = require('express');
const { verifyTwitterTask, verifyInstagramTask, verifyTelegramTask } = require('./verifyController');
const router = express.Router();

router.post('/twitter', verifyTwitterTask);
router.post('/instagram', verifyInstagramTask);
router.get('/telegram/:taskId', verifyTelegramTask);

module.exports = router;
