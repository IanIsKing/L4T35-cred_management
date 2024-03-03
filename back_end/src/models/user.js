import mongoose from "mongoose";
import { Schema } from "mongoose";

// User schema and model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  // Password is hashed before saving to the database
  passwordHash: { type: String, required: true },
  firstName: String,
  lastName: String,
  createDate: Date,
  lastLoginDate: Date,
  avatar: String,
  role: {
    type: String,
    default: "user",
    enum: ["user", "manager", "admin"],
  },
  OUs: [{ type: Schema.Types.ObjectId, ref: "OrganizationalUnit" }],
  divisions: [{ type: Schema.Types.ObjectId, ref: "Division" }],
  repos: [{ type: Schema.Types.ObjectId, ref: "CredentialRepository" }],
});

const User = mongoose.model("User", userSchema);

export default User;
