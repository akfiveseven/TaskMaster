const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const crypto = require('crypto');
//const cookieParser = require('cookie-parser');
const { MongoClient } = require('mongodb');

// Define your MongoDB URI
const uri = 'mongodb+srv://aqzx127:0jPqmtIPC6V8wxvr@cluster0-todoapp.o3km7xe.mongodb.net/?retryWrites=true&w=majority';

// Set up Express and middleware
const app = express();
//app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  "Access-Control-Allow-Credentials": true
}));
app.use(express.json());

// Generate a secure random secret key (or use a predefined one)
const secretKey = crypto.randomBytes(32).toString('hex');

// Set up session with MongoDB as the session store
app.use(
  session({
    secret: 'bababooey',  // Now using the generated secretKey
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: uri,
      collectionName: 'sessions',
      stringify: true
    }),
    cookie: {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 14, // 2 weeks
      sameSite: 'none',
      httpOnly: true,
      //secure: false, // Uncomment this line when in production and using HTTPS
    }
  })
);

// MongoDB Connection Function
async function connectToMongo() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    return client;
  } catch (err) {
    console.error('MongoDB Atlas connection error:', err);
    throw err;
  }
}

module.exports = connectToMongo;

//-------------------------Routes-----------------------------//


// Inside your route handler
app.post('/api/tasks', async (req, res) => {
  console.log(req.session);
  const client = await connectToMongo();
  const db = client.db('Cluster0-ToDoApp'); // Replace with your database name
  const collection = db.collection('tasks'); // Replace with your collection name

  // The object from req.body
  const taskData = req.body;

  try {
    const result = await collection.insertOne(taskData);
    console.log('Task added to MongoDB:', result);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.close(); // Close the database connection when done
  }
});


 
app.post('/api/accounts/signup', async (req, res) => {
  const client = await connectToMongo();
  const db = client.db('Cluster0-ToDoApp'); // Replace with your database name
  const collection = db.collection('accounts'); // Replace with your collection name

  // The object from req.body
  const accountData = req.body;

  // Check if the username or email already exists in the database
  const existingUserData = await collection.findOne({
    $or: [{ username: accountData.username }, { email: accountData.email }],
  });
  
  if (existingUserData) {
    // Username or email already exists
    res.status(400).json({ error: 'Username or email already in use' });
    client.close();
    return;
  }

  try {
    const result = await collection.insertOne(accountData);
    console.log('Account added to MongoDB:', result);
    res.status(201).json({ message: "Successfully created account"});
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.close(); // Close the database connection when done
  }
});

app.post('/api/accounts/login', async (req, res) => {
  console.log('Received request for /api/accounts/login');
  console.log('Cookies:', req.cookies); // log incoming cookies
  console.log('Headers:', req.headers); // log incoming headers
  console.log('Session ID:', req.sessionID); // log session ID
  console.log('Session:', req.session); // log session data
  console.log('Received login request');

  // Input validation
  const loginAttempt = req.body;
  if (!loginAttempt || !loginAttempt.username || !loginAttempt.password) {
      console.log('Missing or invalid username/password');
      return res.status(400).json({ error: 'Missing or invalid username/password' });
  }

  let client;
  try {
      client = await connectToMongo();
      const db = client.db('Cluster0-ToDoApp');
      const collection = db.collection('accounts');

      // Find existing user with the provided username and password
      const existingUserAccount = await collection.findOne({
          username: loginAttempt.username,
          password: loginAttempt.password,
      });

      // Check if the user exists and credentials are correct
      if (!existingUserAccount) {
          console.log('Invalid credentials');
          return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Set session variables and save the session
      console.log('Logged In Successfully');
      req.session.isAuth = true;
      req.session.user = existingUserAccount.username;
      req.session.save(err => {
          if (err) {
              console.error('Error saving session:', err);
              return res.status(500).json({ error: 'Internal server error' });
          }
          console.log('Session saved successfully:', req.session);
          console.log('Session ID:', req.sessionID);
          return res.status(200).json({ message: 'Successfully Logged In', username: existingUserAccount.username, sessionID: req.sessionID});
      });
  } catch (error) {
      // Handle unexpected errors
      console.error('Error during login process:', error);
      res.status(500).json({ error: 'Internal server error' });
  } finally {
      // Always close the MongoDB client connection when done
      if (client) client.close();
  }
});


app.get('/api/tasks', async (req, res) => {
  //console.log(req.session.user)
  //console.log(req.headers)
  console.log('Received request for /api/tasks');
  console.log('Incoming Cookies:', req.cookies);
  console.log('Session ID:', req.sessionID); // Log the session ID
  console.log('Session:', req.session); // Log the entire session
  const clientSession = req.headers.clientSession;
  //console.log("Client Session: " )
  //console.log(req);

  if (!req.session.isAuth) {
    console.log('User not authenticated. Session:', req.session);
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  const loggedInUser = req.session.user;
  let client;
  
  try {
      client = await connectToMongo();
      const db = client.db('Cluster0-ToDoApp');
      const collection = db.collection('tasks'); // Assuming your tasks are stored in a 'tasks' collection

      collection.find({ loggedInUsername: loggedInUser }).toArray((err, tasks) => {
          if (err) {
              throw err;
          }
          res.json(tasks);
      });
  } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: 'Failed to fetch tasks' });
  } finally {
      if (client) {
          client.close();
      }
  }
});

app.get('/api/logout', (req, res) => {
  req.session.destroy(err => {
      if (err) {
          return res.status(500).send("Could not log out.");
      } else {
          res.status(200).send("Logged out successfully.");
      }
  });
});


// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


