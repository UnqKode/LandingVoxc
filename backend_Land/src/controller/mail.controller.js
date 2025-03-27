import { User } from '../model/user.model.js';

export const addEmail = async (req, res) => {
  const { email } = req.body;

  console.log("📩 Incoming request to addEmail with body:", req.body);

  if (!email) {
    console.log("❌ No email provided in request body.");
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    console.log(`🔍 Checking if email ${email} already exists in database...`);
    const existing = await User.findOne({ email });

    if (existing) {
      console.log(`⚠️ Email ${email} already exists in DB. Rejecting request.`);
      return res.status(409).json({ message: 'Email already exists.' });
    }

    console.log(`🆕 Email not found. Creating new entry for ${email}...`);
    const newUser = new User({ email });
    await newUser.save();
    console.log(`✅ Email ${email} saved successfully.`);

    res.status(201).json({
      message: 'Email saved successfully!',
      email: newUser.email
    });
  } catch (error) {
    console.error("❗ Error occurred while saving email:", error.message);
    res.status(500).json({
      message: 'Error saving email.',
      error: error.message
    });
  }
};
