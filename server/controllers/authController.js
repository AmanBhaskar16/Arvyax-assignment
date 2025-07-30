import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';

// Register controller function for registering a new user
export const register = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  // If user already exists
  if (existingUser) return res.status(400).json({ message: 'Email already in use' });

  // If the user does not exist,then save it to the database
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ email, password_hash: hash });
  await user.save();
  res.status(201).json({ message: 'User registered' });
};

// Login controller function for logging in the user
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // if the user does not exist or the password is incorrect
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  // If details filled are correct ,then create a token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};
