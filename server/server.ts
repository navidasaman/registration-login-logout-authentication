import express, { Request, Response } from 'express';
import mysql from 'mysql';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();

const app = express(); // instance of express app
const PORT = 3001; // port number which the server listens for incoming requests
app.use(express.json()); // middleware to the Express application to parse JSON data in request bodies
app.use(cors()); //  middleware to the Express application to enable CORS to be able for backend to access API from frontend
app.use(cookieParser());

// Creates a connection to the MySQL database
const connection = mysql.createConnection({
  host: '[sensitive data, edited out]',
  user: '[sensitive data, edited out]',
  password: '[sensitive data, edited out]',
  port: '[sensitive data, edited out]',
  database: '[sensitive data, edited out]',
});
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


// Register endpoint
app.post(`${process.env.REGISTER_ENDPOINT}`, (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Insert user into the database
    connection.query(
      'INSERT INTO [sensitive data, edited out] (username, password) VALUES (?, ?)',
      [username, hash],
      (err, result) => {
        if (err) {
          console.error('Error registering user:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        res.status(201).json({ message: 'User registered successfully' });
      }
    );
  });
});

// Login endpoint
app.post(`${process.env.LOGIN_ENDPOINT}`, (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Check if the user exists
  connection.query(
    'SELECT * FROM [sensitive data, edited out] WHERE username = ?',
    [username],
    (err, result) => {
      if (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      if (result.length === 0) {
        res.status(401).json({ error: 'Invalid username or password' });
        return;
      }

      const user = result[0];

      // Compare the password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }

        if (!isMatch) {
          res.status(401).json({ error: 'Invalid username or password' });
          return;
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, 'your_secret_key');

        // Set the token in a cookie
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Logged in successfully' });
      });
    }
  );
});

app.get(`${process.env.LOGOUT_ENDPOINT}`, (req: Request, res: Response) => {
  handleLogout(req, res);
});

function handleLogout(req: Request, res: Response) {
  // Code to handle the logout request 
  res.clearCookie('token');
  res.cookie('token', null, { expires: new Date(0), httpOnly: true });
  res.status(200).json({ message: 'Logout successful' });
}

app.get('/login', (req: Request, res: Response) => {
  res.redirect('/login.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});