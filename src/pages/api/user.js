import User from '../../models/userModal';
import connectDb from '../../utils/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await connectDb();
            const { email, name } = req.body;
            const newUser = new User({ email, name });
            const result = await newUser.save();
            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else if (req.method === 'GET') {
        try {
            await connectDb();
            const { email } = req.query;
            let user = await User.findOne({ email });
            if (!user) {
                const { name } = req.query; 
                const newUser = new User({ email, name });
                user = await newUser.save();
            }

            return res.status(200).json(user);
        } catch (error) {
            console.error('Error finding or creating user:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
