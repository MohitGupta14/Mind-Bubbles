import Content from "../../models/contentModal";
import connectDb from "../../utils/db";

export default async function handler(req, res) {
    try {
      await connectDb();
  
      if (req.method === 'POST') {
        const { content } = req.body;
        const createdBy = req.query.createdBy;
        
        // Create new content
        const newUser = new Content({  content, createdBy });
        const result = await newUser.save();
  
        res.status(201).json(result);
      }
  
      if (req.method === 'GET') {
        const userId = req.query.userId; // Change to query instead of body
        if(!userId){
            res.status(400).json("userId not found");
        }
        const data = await Content.find({ createdBy: userId });
        console.log(data)
        if(!data) res.status(404).json("content not found");
        res.status(200).json(data);
      }

      if (req.method === 'DELETE') {
        const content = req.query.content; // Change to query instead of body
        if(!content){
            res.status(400).json("content not found");
        }
        const data = await Content.findOneAndDelete({content : content});
        console.log(data)
        if(!data) res.status(404).json("Note Deleted Successfully");
        res.status(200).json(data);
      }
    } catch (error) {
      console.error('Error in API handler:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }