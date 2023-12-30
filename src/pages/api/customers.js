import mongoose from 'mongoose';
import { getSession } from 'next-auth/react';
import connectDb from '../../utils/db';

const customerSchema = new mongoose.Schema({
  content: String,
  token: String,
}, { versionKey: false });

const Customer = mongoose.model('Customer', customerSchema);

export default async function handler(req, res) {
  try {
    await connectDb(); 

    if (req.method === 'GET') {
      const session = await getSession({ req });

      if (!session) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const data = await Customer.find({token : session.user.mail});
      console.log('Data from MongoDB:', data);
      res.status(200).json(data);
    } else if (req.method === 'POST') {
      // Handle POST request
      const { content, token } = req.body;
      const newNote = new Customer({ content, token });
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
  }
}
