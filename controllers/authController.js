import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Validate the input data (optional, but recommended)
    if (!fullname || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    // Return the response
    res.status(201).json({
      message: 'User registered successfully',
      status : "success",
      user: {
       
        id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    // console.error('Registration error:', error);  // Log the error to the server console
    res.status(500).json({ 
      message : "Registration Error",
      error: 'Server error'
     });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });
    res.status(200).json({ token, user: { id: user._id, name: `${user.firstName} ${user.lastName}`, email: user.email, role: user.role  } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export { register, login };