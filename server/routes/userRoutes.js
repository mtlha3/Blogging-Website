import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import LoginHistory from "../models/Login.js";

dotenv.config();
const router = express.Router();


//================================================================================================
// Middleware for token verification

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

//================================================================================================
//User registration route
router.post("/register", async (req, res) => {
  const { name, userId, password } = req.body;

  if (!name || !userId || !password) {
    return res.status(400).json({ message: "Name, userId, and password are required" });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters long" });
  }

  if (!/^[a-zA-Z0-9]*$/.test(password)) {
    return res.status(400).json({ message: "Password must not contain special characters" });
  }

  if (!/[a-zA-Z]/.test(password)) {
    return res.status(400).json({ message: "Password must contain at least one alphabet" });
  }

  try {
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(409).json({ message: "UserId or email already registered. Please try with a unique one" });
    }

    const newUser = new User({ name, userId, password });

    const nextId = await User.incrementId(); 
    newUser.Id = nextId;

    await newUser.save();

    res.status(201).json({ message: "User saved successfully", data: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving user", error });
  }
});


//================================================================================================
//get user Route for login
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ message: "Users fetched successfully", data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users", error });
  }
});

//================================================================================================
// sends user information after successful login  
router.post("/login", async (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).json({ message: "User ID and password are required." });
  }

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const loginHistory = new LoginHistory({
      userId: user.userId,
      Id: user.Id,
    });
    await loginHistory.save();

    const token = jwt.sign(
      { userId: user.Id, name : user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } 
    );

    res.status(200).json({
      message: "Login successful.",
      token, 
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error logging in.", error });
  }
});

//================================================================================================
//tokens match and acceess granting to home page

router.get('/protected', verifyToken, (req, res) => {
  console.log('Protected route hit');
  if (req.user) {
    console.log('User:', req.user);
    return res.json({ message: 'Access granted' });
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
});

export default router;
