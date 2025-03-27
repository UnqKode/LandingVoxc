import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './lib/db.js';
import mailRoutes from './routes/email.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // ✅ Added properly
console.log("✅ Middleware for JSON parsing and CORS applied.");

connectDB();

app.get('/', (req, res) => {
  console.log("📥 GET / hit");
  res.send('🚀 Server is running and MongoDB is connected!');
});

app.use('/api/mail', (req, res, next) => {
  console.log(`📨 Request received at /api/mail -> ${req.method} ${req.url}`);
  next();
});

app.use('/api/mail', mailRoutes);
console.log("📦 Mail routes loaded under /api/mail");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌐 Server listening on port ${PORT}`);
});
