const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    createdOn: { type: Date, default: Date.now }
});

const Content = mongoose.model('content', contentSchema);    
export default Content;      