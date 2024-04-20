import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {type : String , required: true , unique: true},
  name : {type : String , required : true},
});

const User = mongoose.model('user', userSchema);    
export default User;      