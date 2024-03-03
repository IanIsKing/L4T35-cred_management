import mongoose from "mongoose";

// CredentialRepository schema and model
const credentialRepositorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  repos: [
    {
      name: { type: String, required: true },
      username: { type: String, required: true },
      // this pasword is not encripted because we returning it in readable text to the user
      password: { type: String, required: true },
      // For any other necessary details
      additionalInfo: String,
    },
  ],
  subDir: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const CredentialRepository = mongoose.model(
  "CredentialRepository",
  credentialRepositorySchema
);

export default CredentialRepository;
