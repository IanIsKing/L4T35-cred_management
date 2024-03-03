// Division schema and model
import mongoose from "mongoose";
import { Schema } from "mongoose";

// division schema and model
const divisionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  subDir: [
    {
      type: Schema.Types.ObjectId,
      ref: "CredentialRepository",
    },
  ],
});

const Division = mongoose.model("Division", divisionSchema);

export default Division;
