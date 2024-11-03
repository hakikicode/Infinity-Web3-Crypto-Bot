const express = require('express');
const { createTask, getTasks, completeTask, updateTask, deleteTask } = require('./taskController');
const router = express.Router();

router.post('/', createTask);
router.get('/', getTasks);
router.post('/complete/:taskId', completeTask);
router.put('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

module.exports = router;
