import mongoose from "mongoose";


const {Schema} = mongoose;

const userSchema = new Schema({
  name:{
    type:String,
    required:[true, 'Username is required'],
    trim: true,
    maxLength: 30,
    minLength:2
  },
  email:{
    type:String,
    required:[true, 'Email is required'],
    unique:true,
    trim: true,
    lowercase:true,
    match:[/\S+@\S+\.\S+/, 'Please he fill the valid email address']
  },
  password:{
    type:String,
    required:[true, 'Password is required'],
    minlength:6
  }
},{ timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;
