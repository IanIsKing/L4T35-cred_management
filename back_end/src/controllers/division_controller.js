// Division controller contains all the functions to perform CRUD operations on the Division model
import Division from "../models/divisions.js";

// Create a new division
export const createDivision = async (req, res) => {
  if (req.user.role === "user" || req.user.role === "manager") {
    return res.status(403).json({
      message: "You are not authorized to access this resource",
      variant: "danger",
    });
  }
  try {
    const newDivision = new Division(req.body);
    await newDivision.save();
    res.status(201).json({
      message: newDivision.name + " created successfully",
      variant: "success",
    });
  } catch (error) {
    res.status(400).json({ message: error.message, variant: "danger" });
  }
};

// Get all divisions
export const listDivisions = async (req, res) => {
  if (req.user.role === "user" || req.user.role === "manager") {
    return res.status(403).json({
      message: "You are not authorized to access this resource",
      variant: "danger",
    });
  }
  try {
    const divisions = await Division.find().populate("subDir");
    res.json(divisions);
  } catch (error) {
    res.status(500).json({ message: error.message, variant: "danger" });
  }
};

// Get all division by OU
export const listDivisionsByOU = async (req, res) => {
  try {
    const divisions = await Division.find({
      organizationalUnit: req.params.id,
    });
    res.json(divisions);
  } catch (error) {
    res.status(500).json({ message: error.message, variant: "danger" });
  }
};

// Update a division
export const updateDivision = async (req, res) => {
  if (req.user.role === "user" || req.user.role === "manager") {
    return res.status(403).json({
      message: "You are not authorized to access this resource",
      variant: "danger",
    });
  }
  try {
    const updatedDivision = await Division.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json({
      message: updatedDivision.name + " updated successfully",
      variant: "success",
    });
  } catch (error) {
    res.status(400).json({ message: error.message, variant: "danger" });
  }
};

// get a division
export const getDivision = async (req, res) => {
  if (req.user.role === "user" || req.user.role === "manager") {
    return res.status(403).json({
      message: "You are not authorized to access this resource",
      variant: "danger",
    });
  }
  try {
    const division = await Division.findById(req.params.id);
    res.json(division);
  } catch (error) {
    res.status(500).json({ message: error.message, variant: "danger" });
  }
};
