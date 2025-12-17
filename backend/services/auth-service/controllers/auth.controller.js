import { register } from '../services/auth.service.js';

export const registerUser = async (req, res) => {
  try {
    const user = await register(req.body);
    res.status(201).json({
      message: 'User registered successfully',
      user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
