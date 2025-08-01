import mongoose from "mongoose";
// Session schema for the blue print of the details stored for a session
const sessionSchema = new mongoose.Schema({
  user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  title:{
    type : String,
    required : true
  },
  tags: [String],
  json_file_url:{
    type : String
  } ,
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now 
  }
})

const Session = mongoose.model('Session',sessionSchema);

export default Session;
