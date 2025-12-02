import User from "../model/userModel.js";

// Create user
export const create = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ msg: "Request body is empty" });
    }
    const user = new User(req.body);
    await user.save();
    res.status(200).json({ msg: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
export const getAll = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) return res.status(404).json({ msg: "No users found" });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get one user by ID
export const getOne = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user
export const update = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ msg: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
