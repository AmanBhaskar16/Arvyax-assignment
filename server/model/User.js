import mongoose from "mongoose";
// User schema for the blue print of the details stored for a user
const userSchema = new mongoose.Schema({

  email: { type: String,
          required: true,
          unique: true 
        },
  password_hash: { type: String,
                  required: true 
                },
  created_at: { type: Date,
                default: Date.now
              }
});

const User = mongoose.model('User',userSchema);

export default User;