import express from 'express';
import { addEmail } from '../controller/mail.controller.js';

const router = express.Router();

console.log("📦 Email router loaded...");

router.post("/recordMail", (req, res, next) => {
  console.log("📨 Request received at /api/mail -> POST /recordMail");
  next(); // Pass control to the actual controller
}, addEmail);

export default router;
