const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
      trim: true,
      index:true,
      minlength: [4, "First name must be at least 4 characters long."], // Corrected: minlength (lowercase)
      maxlength: [30, "First name cannot exceed 30 characters."], // Corrected: maxlength (lowercase)
    },
    lastName: {
      type: String,
      trim: true,
    },
    userName: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, "Username must be at least 3 characters long."],
      maxlength: [20, "Username cannot exceed 20 characters."],
      validate: {
        validator: function (value) {
          if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            return false;
          }
          const reservedNames = ["admin", "root", "support", "contact", "api"];
          return !reservedNames.includes(value); // Returns false if the name is reserved
        },
        message: (props) =>
          `${props.value} is not a valid or is a reserved username.`,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email address");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (
          !validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          })
        ) {
          throw new Error(
            "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol."
          );
        }
      },
    },
    age: {
      type: Number,
      min: [18, "You must be at least 18 years old."],
    },
    gender: {
      type: String,

      enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} is not a supported gender.`,
      },
    },
    photoUrl: {
      type: String,
      trim: true,
      validate(value) {
        if (value && !validator.isURL(value)) {
          throw new Error("Invalid URL provided for photoUrl.");
        }
      },
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
    projects: [{
    title: String,
    description: String,
    link: String,
    technologies: [String]
  }],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

userSchema.methods.getJwt = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "SHUBHI@TINDER$1DEC", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.verifyPassword = async function (password) {
  // const user = this;

  // const passwordHash = this.password;
  const varifyBcrypt = await bcrypt.compare(password, this.password);
  return varifyBcrypt;
};

module.exports = mongoose.model("user", userSchema);
