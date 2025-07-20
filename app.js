const express = require("express");
const app = express();
const connectDB = require("./src/config/database");
const User = require("./src/models/user");
const { body, validationResult } = require("express-validator");
app.use(express.json());

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
    .withMessage("Name is required.")
    .isLength({ min: 4 })
    .withMessage("First name must be at least 4 characters."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters."),
  body("gender")
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be 'male', 'female' or 'other'."),
];

app.post("/signup", signupValidationRules, async (req, res) => {
  //!creating a instance of user model

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ message: "User added successfully." });
  } catch (err) {
    res.status(400).send({ error: "Error saving user: " + err.message });
  }
});

// get user by email
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

// get all user data
app.get("/feed", async (req, res) => {
  try {
    const feed = await User.find({});
    res.send(feed);
  } catch (error) {
    res.status(500).send({ error: "Something went wrong." });
  }
});

//delete api
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

//user data update api based on id
app.patch("/user/:userId", updateUserValidationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() });
  }

  const userId = req.params.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATE = ["photoUrl", "about", "gender", "skills", "age"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATE.includes(k)
    );

    if (!isUpdateAllowed) {
      return res
        .status(400)
        .send({ error: "Update contains forbidden fields." });
    }
    if (data.skills && data.skills.length > 10) {
      return res
        .status(400)
        .send({ error: "You can have a maximum of 10 skills." });
    }
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).send({ error: "User not found." });
    }

    res.send(updatedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

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
