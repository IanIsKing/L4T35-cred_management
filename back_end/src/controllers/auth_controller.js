// Controller for user authentication and user management
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import avatars from "../avatars/avatars.js";

// Authenticate a user
export const authUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        message: "User not found or password is invalid!",
        variant: "danger",
      });
    }
    // Check if the password is valid
    if (!bcrypt.compareSync(req.body.password, user.passwordHash)) {
      return res.status(400).json({
        message: "User not found or password is invalid!",
        variant: "danger",
      });
    }

    // Update lastLoginDate to current date and time
    user.lastLoginDate = new Date();
    await user.save();
    // Create a token
    const payload = {
      id: user._id,
      name: user.firstName,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });
    res.json({ token: token, user: user });
  } catch (error) {
    res.status(500).json({ message: error.message, variant: "danger" });
  }
};

//  get the avatars
export const getAvatars = async (req, res) => {
  res.json(avatars); // Send the avatars object as a JSON response
};

// Create a new user
export const createUser = async (req, res) => {
  // Check if the user already exists
  const checkUser = await User.findOne({ email: req.body.email });
  if (checkUser) {
    console.log("User already exists");
    return res.status(400).json({
      message: "User already exists",
      variant: "danger",
    });
  }
  // Create a new user and hash the password
  try {
    const newUser = new User(req.body);
    newUser.passwordHash = bcrypt.hashSync(req.body.password, 10); // hash the password
    newUser.createDate = new Date();
    newUser.lastLoginDate = new Date();
    await newUser.save();
    res.status(201).json({
      message: newUser.firstName + " created successfully",
      variant: "success",
    });
  } catch (error) {
    res.status(400).json({ message: error.message, variant: "danger" });
  }
};

// Protected functions below
// ----------------------------------------------//

// Verify token and return user data
export const verifyToken = async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers["authorization"].split(" ")[1]; // Assumes "Bearer <token>"
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Use the decoded ID to find the user
    const user = await User.findById(decoded.id).select("-passwordHash"); // Exclude password hash from the response

    // check if the user exists
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", variant: "danger" });
    }
    user.lastLoginDate = new Date();

    // Return the user data (excluding sensitive information like the password hash)
    res.json({ user: user });
  } catch (error) {
    console.error("Token verification error:", error);
    res
      .status(500)
      .json({ message: "Invalid or expired token", variant: "danger" });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  if (req.user.role === "user" || req.user.role === "manager") {
    return res.status(403).json({
      message: "You are not authorized to access this resource",
      variant: "danger",
    });
  }
  try {
    const users = await User.find()
      .select("-passwordHash")
      .populate({
        path: "OUs",
        populate: { path: "subDir", populate: { path: "subDir" } },
      })
      .populate("divisions")
      .populate("repos"); // Exclude password hashes from the response
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message, variant: "danger" });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", variant: "danger" });
    }
    Object.assign(user, req.body);
    await user.save();
    res.json({ message: "User updated successfully", variant: "success" });
  } catch (error) {
    console.log("Error updating user:", error);
    res.status(500).json({ message: error.message, variant: "danger" });
  }
};
