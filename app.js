// --- Imports ---
const express = require("express");
const app = express();
const connectDB = require("./src/config/database");
const User = require("./src/models/user");
const { body, validationResult } = require("express-validator");
const { validateSignUpData } = require("./src/utils/validation");
const bcrypt = require("bcrypt");

// --- Core Middleware ---
// Enables the express app to parse JSON formatted request bodies
app.use(express.json());

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
app.post("/signup", signupValidationRules, validateSignUpData ,async (req, res) => {
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
});

//login user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send({ error: "Email and password are required." });
    // Find the user by their email address.
    const user = await User.findOne({ email });

    // Combine the user existence check and password comparison into a single condition.
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: "Invalid credentials." });
    }

    // On success, you would typically generate a JWT token.
    res.send({ message: "User login successful" });
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

/**
 * @route   GET /user
 * @desc    Gets a single user by their email via query string.
 * @example /user?email=test@example.com
 */

app.get("/user", async (req, res) => {
  const userEmail = req.query.email;
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).send({ error: "User not found." });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: "something went wrong." });
  }
});

/**
 * @route   GET /feed
 * @desc    Gets all users in the database.
 */
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: "Something went wrong." });
  }
});

/**
 * @route   DELETE /user/:id
 * @desc    Deletes a user by their ID.
 */
app.delete("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    // await User.findByIdAndDelete({ _id: userId });
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).send({ error: "User not found." });
    }

    res.send({ message: "User deleted successfully." });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

/**
 * @route   PATCH /user/:userId
 * @desc    Updates a user's profile information.
 */

app.patch("/user/:userId", updateUserValidationRules, async (req, res) => {
  // Check for validation errors from updateUserValidationRules.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() });
  }

  const userId = req.params.userId;
  const updates = req.body;

  try {
    // Security: Whitelist of fields that are allowed to be updated.
    const ALLOWED_UPDATE = ["photoUrl", "about", "gender", "skills", "age"];

    const isUpdateAllowed = Object.keys(updates).every((k) =>
      ALLOWED_UPDATE.includes(k)
    );

    if (!isUpdateAllowed) {
      return res
        .status(400)
        .send({ error: "Update contains forbidden fields." });
    }
    // Custom business logic validation.
    if (updates.skills && updates.skills.length > 10) {
      return res
        .status(400)
        .send({ error: "You can have a maximum of 10 skills." });
    }

    // Find the user and apply updates.
    // { new: true } returns the modified document.
    // { runValidators: true } ensures Mongoose schema validation is run.
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).send({ error: "User not found." });
    }

    res.send(updatedUser);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).send({ error: error.message });
    }

    res.status(500).send({ error: "An unexpected error occurred." });
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
