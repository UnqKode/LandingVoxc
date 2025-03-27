import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './lib/db.js';
import mailRoutes from './routes/email.routes.js';
import path from "path"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // ✅ Added properly
console.log("✅ Middleware for JSON parsing and CORS applied.");

const __dirname = path.resolve();
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


if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌐 Server listening on port ${PORT}`);
});
