const express = require("express");
const { validateEditProfileData } = require("../utils/validation");
const { userAuth } = require("../middleware/auth");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

// profile of user
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(401).send({ message: "Invalid or expired token." });
  }
});

// profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
//   try {
//     if (!validateEditProfileData(req)) {
//       return res
//         .status(400)
//         .send({ message: "Request contains invalid fields." });
//     }
//     const loggedInUser = req.user;

//     Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
//     await loggedInUser.save();
//     res.json({ message: "edit successfully", data: loggedInUser });
//   } catch (err) {
//     res.status(400).send("err:" + err.message);
//   }
// });

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    // We can handle validation directly here or use a library like express-validator
    const { firstName, lastName, about, skills, headline, photoUrl } = req.body;
    
    // Get the Mongoose document for the logged-in user from the auth middleware
    const userToUpdate = req.user;

    // ✅ SECURE: Explicitly update only the fields you want to allow.
    // This prevents the mass assignment vulnerability.
    if (firstName) userToUpdate.firstName = firstName;
    if (lastName) userToUpdate.lastName = lastName;
    if (about) userToUpdate.about = about;
    if (headline) userToUpdate.headline = headline;
    if (photoUrl) userToUpdate.photoUrl = photoUrl;

    // ✅ FIX: Process the skills string into an array before saving.
    if (skills && typeof skills === 'string') {
      // Convert the comma-separated string into an array of trimmed strings
      userToUpdate.skills = skills.split(',').map(skill => skill.trim());
    } else if (Array.isArray(skills)) {
      // If they send an array, accept it
      userToUpdate.skills = skills;
    }

    // Save the updated user document. This will trigger any Mongoose middleware (hooks).
    const updatedUser = await userToUpdate.save();
    
    // It's good practice to not send the password back, even if it's hashed.
    updatedUser.password = undefined;

    res.status(200).json({ message: "Profile updated successfully", data: updatedUser });

  } catch (err) {
    console.error("ERROR UPDATING PROFILE:", err);
    // ✅ IMPROVEMENT: Send a consistent JSON error response and use a 500 status code.
    res.status(500).json({ message: "Server error while updating profile." });
  }
});

// PATCH API to change the password
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).send({ message: "Both fields are required." });
    }

    const user = req.user;

    // Check if current password matches
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Incorrect current password." });
    }

    // Prevent using the same password
    if (currentPassword === newPassword) {
      return res.status(400).send({
        message: "New password cannot be the same as the old password.",
      });
    }

    // Hash and update the new password
    user.password = newPassword;

    await user.save();

    // Invalidate the token by clearing the cookie
    res.cookie("token", "", {
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(0),
    });
    res.send({
      message: "Password updated successfully. Please log in again.",
    });
  } catch (error) {
    res.status(400).send("Something went wrong on the server.");
  }
});

module.exports = profileRouter;
