const express = require('express');
const cors = require('cors'); 
const session = require('express-session'); 
const MongoStore = require('connect-mongo');
const crypto = require('crypto');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

//-----------------MongoDB Connection---------------------//
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://aqzx127:0jPqmtIPC6V8wxvr@cluster0-todoapp.o3km7xe.mongodb.net/?retryWrites=true&w=majority';

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

// Generate a secure random secret key
const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey);

// Configure express-session with MongoDB as the session store
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: uri,
      collectionName: 'sessions',
    }),
    cookie: {
      path: '/',  // <--- This sets the path for the cookie.
      maxAge: 1000 * 60 * 60 * 24 * 14, // 2 weeks
      httpOnly: true,
      // secure: true, // Uncomment this line when in production and using HTTPS
    }
  })
);


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
  console.log('Received login request');

  // Input validation
  const loginAttempt = req.body;

  if (!loginAttempt || !loginAttempt.username || !loginAttempt.password) {
      console.log('Missing or invalid username/password');
      res.status(400).json({ error: 'Missing or invalid username/password' });
      return;
  }

  const client = await connectToMongo();
  const db = client.db('Cluster0-ToDoApp');
  const collection = db.collection('accounts');

  const existingUserAccount = await collection.findOne({
      username: loginAttempt.username,
      password: loginAttempt.password,
  });

  if (!existingUserAccount) {
      console.log('Invalid credentials'); 
      res.status(401).json({ error: 'Invalid credentials' });
      client.close();
      return;
  }

  try {
      console.log('Logged In Successfully');
      req.session.isAuth = true;
      req.session.user = existingUserAccount.username;
      console.log(req.session);
      res.status(200).json({ message: 'Successfully Logged In', username: existingUserAccount.username });
  } catch (error) {
      console.error('Error Logging In:', error);
      res.status(500).json({ error: 'Internal server error' });
  } finally {
      client.close();
  }
});

app.get('/api/tasks', async (req, res) => {
  console.log(req.headers)
  console.log(req.session);
  if (!req.session.isAuth) {
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


