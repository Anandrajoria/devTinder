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

// In your backend router file (e.g., routes/profileRouter.js)

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    // ✅ Destructure only the fields that are allowed to be changed
    const {
      firstName,
      lastName,
      age,
      gender,
      about,
      photoUrl,
      skills,
    } = req.body;

    // Get the Mongoose document for the logged-in user from the auth middleware
    const userToUpdate = req.user;

    // Securely update only the allowed fields if they were provided in the request
    if (firstName) userToUpdate.firstName = firstName;
    if (lastName) userToUpdate.lastName = lastName;
    if (age) userToUpdate.age = age;
    if (gender) userToUpdate.gender = gender;
    if (about) userToUpdate.about = about;
    if (photoUrl) userToUpdate.photoUrl = photoUrl;

    // Process the skills string into an array before saving
    if (skills && typeof skills === 'string') {
      userToUpdate.skills = skills.split(',').map(skill => skill.trim());
    } else if (Array.isArray(skills)) {
      userToUpdate.skills = skills;
    }

    // Save the updated user document
    const updatedUser = await userToUpdate.save();
    
    // Remove the password before sending the response back
    updatedUser.password = undefined;

    res.status(200).json({ message: "Profile updated successfully", data: updatedUser });

  } catch (err) {
    console.error("ERROR UPDATING PROFILE:", err);
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
