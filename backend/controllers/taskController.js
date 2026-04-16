const db = require('../config/db');

exports.getTasks = (req, res) => {
  db.query(
    'SELECT * FROM tasks WHERE user_id=?',
    [req.user.id],
    (err, data) => {
      if (err) return res.status(500).json(err);
      res.json(data);
    }
  );
};

exports.createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title required' });
  }

  db.query(
    'INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)',
    [title, description || '', req.user.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Task created' });
    }
  );
};

exports.deleteTask = (req, res) => {
  db.query(
    'DELETE FROM tasks WHERE id=?',
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Task deleted' });
    }
  );
};