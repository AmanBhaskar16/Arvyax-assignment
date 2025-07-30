import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRouter.js';
import sessionRoutes from './routes/sessionRouter.js';

const app = express();
const port = process.env.PORT || 5000;

// Database connection
await connectDB();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// API Routes
app.get('/', (req, res) => {
  res.send("Hello Aman kya haal hai ");
});
app.use('/api/auth', authRoutes);
app.use('/api', sessionRoutes);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
