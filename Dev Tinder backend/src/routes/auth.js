const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");
const { userAuth } = require("../middleware/auth");

const authRouter = express.Router();

const updateUserValidationRules = [
  //validate age
  body("age")
    .optional()
    .isInt({ min: 18 })
    .withMessage("age must be number and at least 18."),

  //validate skills
  body("skills").optional().isArray().withMessage("skills must be an array"),

  //validate photoUrl
  body("photoUrl")
    .optional()
    .isURL()
    .withMessage("Please provied a valid photo url"),

  //gender validation
  body(["about", "gender"]).optional().isString().trim(),
];

const signupValidationRules = [
  body("email").isEmail().withMessage("Valid email is required."),
  body("firstName")
    .notEmpty()
    .withMessage("firstName is required.")
    .isLength({ min: 4 })
    .withMessage("First name must be at least 4 characters."),
  body("userName")
    .notEmpty()
    .withMessage("Username is required.")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters.")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "Username can only contain letters, numbers, and underscores."
    ),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters."),
  body("gender")
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be 'male', 'female' or 'other'."),
];

//signup api
authRouter.post(
  "/signup",
  // signupValidationRules,
  validateSignUpData,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      // Run all your validation checks first.
      const user = new User(req.body);
      const savedUser = await user.save();

      const token = await savedUser.getJwt();
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res
        .status(201)
        .json({ message: "User added successfully.", data: savedUser });
    } catch (err) {
      res.status(400).send({ error: "Error saving user: " + err.message });
    }
  }
);

//login api
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .send({ error: "Email and password are required." });
    // Find the user by their email address.
    const user = await User.findOne({ email });

    // Combine the user existence check and password comparison into a single condition.
    if (!user || !(await user.verifyPassword(password))) {
      return res.status(400).send({ error: "Invalid credentials." });
    }

    // creating the jwt token
    const token = await user.getJwt();

    // add token and cookies and send the responce to user
    res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
    // res.cookie("token", token);

    user.password = undefined;

    res.send({ message: "User login successful", user: user });
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

//logout
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    sameSite: "lax",
    expires: new Date(0),
  });
  res.send("user logged out successfully");
});

module.exports = authRouter;




