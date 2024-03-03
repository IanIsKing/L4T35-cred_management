// OU schema and model
import mongoose from "mongoose";

const organizationalUnitSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  subDir: [{ type: mongoose.Schema.Types.ObjectId, ref: "Division" }],
});

const OrganizationalUnit = mongoose.model(
  "OrganizationalUnit",
  organizationalUnitSchema
);

export default OrganizationalUnit;
