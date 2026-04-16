const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
    [email, hashedPassword, role || 'user'],
    (err) => {
      if (err) return res.status(500).json({ message: 'User already exists' });
      res.json({ message: 'User registered successfully' });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email=?', [email], async (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES}
    );

    res.json({ token });
  });
};