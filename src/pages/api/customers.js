import mongoose from 'mongoose';

  const customerSchema = new mongoose.Schema({
    status: String,
    content: String,
    token: String
  });
  
  const Customer =  mongoose.model('Customer', customerSchema);

export default async function handler(req, res) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    if (req.method === 'GET') {
      // Handle GET request
      const data = await Customer.find({});
      console.log('Data from MongoDB:', data);
      res.status(200).json(data);
    } else if (req.method === 'POST') {
      // Handle POST request
      const { status, content ,token } = req.body; // Change "title" to "Title"
      const newNote = new Customer({ status, content, token }); // Change "title" to "Title"
      const result = await newNote.save();

      console.log('Added note:', result);
      res.status(201).json(result);
    } else if (req.method === 'DELETE') {
      // Handle DELETE request
      const customerId = req.query.id;

      if (!customerId) {
        res.status(400).json({ error: 'Customer ID not provided' });
        return;
      }

      const deletedCustomer = await Customer.findByIdAndDelete(customerId);

      if (!deletedCustomer) {
        res.status(404).json({ error: 'Customer not found' });
      } else {
        console.log(`Customer with ID ${customerId} deleted`);
        res.status(200).json({ message: 'Customer deleted successfully' });
      }
    } else {
      // Handle other HTTP methods
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await mongoose.disconnect();
  }
}
