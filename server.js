const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

//////////////////

const { MongoClient } = require('mongodb');

const uri = '';

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

//////////////////

// Inside your route handler
app.post('/api/tasks', async (req, res) => {
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
const corsOptions = {
  origin: 'http://localhost:3000/todo', // Replace with the actual URL of your frontend
  // Other CORS options if needed
};

app.use(cors(corsOptions));

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


