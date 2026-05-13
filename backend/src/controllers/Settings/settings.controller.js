const User = require("../../models/User");
const bcrypt = require("bcryptjs");

// ============================
// GET SETTINGS
// ============================
exports.getSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ============================
// UPDATE PROFILE
// ============================
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const {
      name,
      email,
      bio,
      github,
      linkedin,
      course,
      profilePic
    } = req.body;

     if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (bio !== undefined) user.bio = bio;
    if (github !== undefined) user.github = github;
    if (linkedin !== undefined) user.linkedin = linkedin;
    if (course !== undefined) user.course = course;
    if (profilePic !== undefined) user.profilePic = profilePic;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
 
// ============================
// UPDATE PREFERENCES
// ============================
exports.updatePreferences = async (req, res) => {
  try {
    const { theme, notifications } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    user.preferences = {
      theme: theme || user.preferences?.theme || "dark",
      notifications:
        notifications !== undefined
          ? notifications
          : user.preferences?.notifications ?? true
    };

    await user.save();

    res.status(200).json({
      message: "Preferences updated",
      preferences: user.preferences
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};