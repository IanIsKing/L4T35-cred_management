//  OU controller contains all the functions to perform CRUD operations on the OrganizationalUnit model
import OrganizationalUnit from "../models/organizationalUnits.js";

// Create a new organizational unit
export const createOU = async (req, res) => {
  if (req.user.role === "user" || req.user.role === "manager") {
    return res.status(403).json({
      message: "You are not authorized to access this resource",
      variant: "danger",
    });
  }
  try {
    const newOU = new OrganizationalUnit(req.body);
    await newOU.save();
    res.status(201).json({
      message: newOU.name + " created successfully",
      variant: "success",
    });
  } catch (error) {
    res.status(400).json({ message: error.message, variant: "danger" });
  }
};

// Get all organizational units
export const listOUs = async (req, res) => {
  if (req.user.role === "user" || req.user.role === "manager") {
    return res.status(403).json({
      message: "You are not authorized to access this resource",
      variant: "danger",
    });
  }
  try {
    const ous = await OrganizationalUnit.find().populate({
      path: "subDir",
      populate: {
        path: "subDir",
        populate: {
          path: "subDir",
        },
      },
    });
    res.json(ous);
  } catch (error) {
    res.status(500).json({ message: error.message, variant: "danger" });
  }
};

// Update an organizational unit
export const updateOU = async (req, res) => {
  if (req.user.role === "user" || req.user.role === "manager") {
    return res.status(403).json({
      message: "You are not authorized to access this resource",
      variant: "danger",
    });
  }
  try {
    const updatedOU = await OrganizationalUnit.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json({
      message: updatedOU.name + " updated successfully",
      variant: "success",
    });
  } catch (error) {
    res.status(400).json({ message: error.message, variant: "danger" });
  }
};

// Delete an organizational unit
export const deleteOU = async (req, res) => {
  if (req.user.role === "user" || req.user.role === "manager") {
    return res.status(403).json({
      message: "You are not authorized to access this resource",
      variant: "danger",
    });
  }
  try {
    const deletedOU = await OrganizationalUnit.findByIdAndDelete(req.params.id);
    res.json({
      message: deletedOU.name + " deleted successfully",
      variant: "success",
    });
  } catch (error) {
    res.status(400).json({ message: error.message, variant: "danger" });
  }
};

// Get an organizational unit by id
export const getOU = async (req, res) => {
  try {
    const ou = await OrganizationalUnit.findById(req.params.id);
    res.json(ou);
  } catch (error) {
    res.status(500).json({ message: error.message, variant: "danger" });
  }
};

// Get an organizational unit by name
export const getOuByName = async (req, res) => {
  try {
    const ou = await OrganizationalUnit.findOne({ name: req.params.name });
    res.json(ou);
  } catch (error) {
    res.status(500).json({ message: error.message, variant: "danger" });
  }
};
