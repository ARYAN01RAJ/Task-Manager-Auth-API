const express = require('express');
const router = express.Router();

const {
  getTasks,
  createTask,
  deleteTask
} = require('../controllers/taskController');

const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, getTasks);
router.post('/', verifyToken, createTask);
router.delete('/:id', verifyToken, deleteTask);

module.exports = router;