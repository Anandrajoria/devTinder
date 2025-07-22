// --- Imports ---
require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./src/config/database");
const User = require("./src/models/user");
const { body, validationResult } = require("express-validator");
const { validateSignUpData } = require("./src/utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./src/middleware/auth");

// --- Core Middleware ---
// Enables the express app to parse JSON formatted request bodies
app.use(express.json());
app.use(cookieParser());

// --- Validation Rule Sets ---

// Validation rules for updating optional user profile fields.
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

// Validation rules for the user signup process.
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

// --- API Routes ---

/**
 * @route   POST /signup
 * @desc    Registers a new user after validation.
 */

// add new user data
app.post(
  "/signup",
  signupValidationRules,
  validateSignUpData,
  async (req, res) => {
    // Check for validation errors defined in signupValidationRules
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      // Run all your validation checks first.
      const user = new User(req.body);
      await user.save();
      res.status(201).send({ message: "User added successfully." });
    } catch (err) {
      res.status(400).send({ error: "Error saving user: " + err.message });
    }
  }
);

//login user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .send({ error: "Email and password are required." });
    // Find the user by their email address.
    const user = await User.findOne({ email });

    // Combine the user existence check and password comparison into a single condition.
    if (!user || !user.varifyPassword(password)) {
      return res.status(400).send({ error: "Invalid credentials." });
    }

    // creating the jwt token
    const token = await user.getJwt()
    console.log(token);

    // add token and cookies and send the responce to user
    res.cookie("token", token);

    res.send({ message: "User login successful" });
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

// profile of user
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(401).send({ message: "Invalid or expired token." });
  }
});


// --- Server Initialization ---
// Connect to the database and start the Express server.
connectDB()
  .then(() => {
    console.log("database connection successful");
    app.listen(7777, () => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
