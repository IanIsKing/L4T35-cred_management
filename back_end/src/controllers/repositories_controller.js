// Reposirory controller contains all the functions to perform CRUD operations on the CredentialRepository model
import CredentialRepository from "../models/credentialRepositories.js";

// Create a new credential repository
export const createRepository = async (req, res) => {
  if (req.user.role === "user") {
    return res.status(403).json({
      message: "You are not authorized to access this resource",
      variant: "danger",
    });
  }
  try {
    const newRepository = new CredentialRepository(req.body);
    await newRepository.save();
    res.status(201).json({
      message: newRepository.name + " created successfully",
      variant: "success",
    });
  } catch (error) {
    res.status(400).json({ message: error.message, variant: "danger" });
  }
};

// Get all credential repositories
export const listRepositories = async (req, res) => {
  if (req.user.role === "user" || req.user.role === "manager") {
    return res.status(403).json({
      message: "You are not authorized to access this resource",
      variant: "danger",
    });
  }
  try {
    const repositories = await CredentialRepository.find().populate({
      path: "subDir", // path to the sub-document(s) in CredentialRepository
      populate: [
        {
          path: "OUs", // path to the sub-document(s) in User
          populate: { path: "subDir" }, // Assuming `subDir` in OUs refers to Divisions
        },
        {
          path: "divisions", // Directly under User
          populate: { path: "subDir" }, // Assuming `subDir` in Divisions refers to Repos
        },
        {
          path: "repos", // Directly under User
          // If you need to populate further inside repos, add another populate object here
        },
      ],
    });

    res.json(repositories);
  } catch (error) {
    res.status(500).json({ message: error.message, variant: "danger" });
  }
};

// get my credential repositories
export const listMyRepositories = async (req, res) => {
  console.log("req.user ", req.user);
  try {
    const repositories = await CredentialRepository.find({
      subDir: req.user.id,
    });
    res.json(repositories);
  } catch (error) {
    res.status(500).json({ message: error.message, variant: "danger" });
  }
};

export const updateRepository = async (req, res) => {
  try {
    const updatedRepository = await CredentialRepository.findByIdAndUpdate(
      req.query.id,
      req.body,
      { new: true }
    );
    res.json(updatedRepository);
  } catch (error) {
    res.status(400).json({ message: error.message, variant: "danger" });
  }
};
