const validator = require("validator");
const User = require("../models/user");

const validateSignUpData = async (req, res, next) => {
  try {
    const { firstName, userName, email, password } = req.body;

    // Synchronous checks
    if (!firstName) throw new Error("First name is required.");
    if (!validator.isEmail(email))
      throw new Error("A valid email is required.");
    if (!validator.isStrongPassword(password))
      throw new Error("Password is not strong enough.");

    // Asynchronous database checks
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      throw new Error("Email is already registered.");
    }
    if (!userName) throw new Error("Username is required.");

    const existingUserName = await User.findOne({
      userName: userName?.toLowerCase(),
    });
    if (existingUserName) {
      throw new Error("Username is already taken.");
    }
    next();
    
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

function validateEditProfileData(req) {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "email",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isAllowed;
}
module.exports = { validateSignUpData, validateEditProfileData };
