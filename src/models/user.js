const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
      trim: true,
      minlength: [4, "First name must be at least 4 characters long."], // Corrected: minlength (lowercase)
      maxlength: [30, "First name cannot exceed 30 characters."], // Corrected: maxlength (lowercase)
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters long."], // Added for security
    },
    age: {
      type: Number,
      min: [18, "You must be at least 18 years old."],
    },
    gender: {
      type: String,
      required: true,

      enum: {
        values: ["male", "female", "other"],
        message: "{VALUE} is not a supported gender.",
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://imgs.search.brave.com/gERZhZ4OGFK96Hl-aMxlMTS8kCORTP_VZl0CpbiRMrs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/cG5naXRlbS5jb20v/cGltZ3MvbS8yNzIt/MjcyMDY1Nl91c2Vy/LXByb2ZpbGUtZHVt/bXktaGQtcG5nLWRv/d25sb2FkLnBuZw",
    },
    about: {
      type: String,
      trim: true,
      default: "this is default about of the user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
