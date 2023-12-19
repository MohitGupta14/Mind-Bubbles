import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db();
    const collection = database.collection('Customer');

    if (req.method === 'GET') {
      // Handle GET request
      const data = await collection.find({}).toArray();
      console.log('Data from MongoDB:', data);
      res.status(200).json(data);
    } else if (req.method === 'POST') {
      // Handle POST request
      const { title, content } = req.body;
      const newNote = { title, content };
      const result = await collection.insertOne(newNote);

      console.log('Added note:', result.ops[0]);
      res.status(201).json(result.ops[0]);
    } else {
      // Handle other HTTP methods
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}
