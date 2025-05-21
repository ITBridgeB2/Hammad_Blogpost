import cors from 'cors';
import express from 'express';
import mysql from 'mysql2';

const blogapp = express();
blogapp.use(cors());
blogapp.use(express.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'blogpost'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database.');
});

// Registration 
blogapp.post('/userdetails/register', (req, res) => {
  const { name, mobileNumber, email, password } = req.body;

  if (!name || !mobileNumber || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'INSERT INTO userdetails (name, mobileNumber, email, password) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, mobileNumber, email, password], (err, result) => {
    if (err) {
      console.error('Error during registration:', err);
      return res.status(500).json({ message: 'Registration failed' });
    }
    res.status(200).json({ message: 'User registered successfully' });
  });
});


blogapp.post('/userdetails/login', (req, res) => {
  const { mobileNumber, password } = req.body;

  const sql = 'SELECT * FROM userdetails WHERE mobileNumber = ? AND password = ?';
  db.query(sql, [mobileNumber, password], (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];
    res.status(200).json({ firstName: user.name });
  });
});



blogapp.post('/posts/posts', (req, res) => {
    const { title, content, author , category } = req.body;
  
    const sql = 'INSERT INTO posts (title, content, author , category) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, content, author , category], (err, result) => {
      if (err) {
        console.error('Error during post submission:', err);
        return res.status(500).json({ message: 'Post submission failed' });
      }
      res.status(200).json({ message: 'Post submitted successfully' });
    });
  });



blogapp.get('/posts', (req, res) => {
    const sql = 'SELECT * FROM posts ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  });
  


  
  blogapp.delete('/posts/:id', (req, res) => {
    const sql = 'DELETE FROM posts WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Post deleted successfully' });
    });
  });


  blogapp.put('/posts/:id', (req, res) => {
    const { title, content, author , category } = req.body;
    const { id } = req.params;
  
    const sql = 'UPDATE posts SET title = ?, content = ?, author = ?, category = ? WHERE id = ?';
    db.query(sql, [title, content, author, category , id], (err, result) => {
      if (err) {
        console.error('Error updating post:', err);
        return res.status(500).json({ message: 'Failed to update post' });
      }
      res.status(200).json({ message: 'Post updated successfully' });
    });
  });


  blogapp.get('/posts/category/:category', (req, res) => {
    const category = req.params.category;
    const sql = 'SELECT * FROM posts WHERE category = ? ORDER BY created_at DESC';
    db.query(sql, [category], (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  });


blogapp.listen(5100, () => {
  console.log('Server is running on port 5100');
});
