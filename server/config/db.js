import mongoose from "mongoose";
// Config file to connect express application to the database
const connectDB = async () => {
  try {
    mongoose.connection.on('connected',()=> console.log('DB connected'));
    await mongoose.connect(`${process.env.MONGODB_URI}/arvyax`)
  } catch (error) {
    console.log(error.message);
  }
}

export default connectDB;