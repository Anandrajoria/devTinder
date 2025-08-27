require('dotenv').config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET="SHUBHI@TINDER$1DEC"
// console.log( process.env.JWT_SECRET);

// const userAuth = async (req, res, next) => {
//   try {
//     const { token } = req.cookies;

//     if (!token) {
//       res
//         .status(401)
//         .send({ message: "Authentication failed. Invalid token." });
//     }

//     // const decodedObj = await jwt.verify(token, JWT_SECRET);
//     const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);

//     const { _id } = decodedObj;

//     const user = await User.findById(_id);
//     if (!user) {
//       res
//         .status(401)
//         .send({ message: "Authentication failed. User not found." });
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(401).send({ message: "Authentication failed. Invalid token." });
//   }
// };

// module.exports = { userAuth };

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .send({ message: "Authentication failed. Invalid token." });
    }

    const decodedObj = await jwt.verify(token, JWT_SECRET);

    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      return res
        .status(401)
        .send({ message: "Authentication failed. User not found." });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Authentication failed. Invalid token." });
  }
};

module.exports = { userAuth };


const userAuthOptional = async (req, res, next) => {
  try {
    // Get token from cookie or Authorization header
    const token =
      req.cookies?.token ||
      req.header("Authorization")?.replace("Bearer ", JWT_SECRET);

    if (!token) {
      // No token — treat as guest
      return next();
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find user in DB
    const user = await User.findById(decoded._id);
    if (user) {
      req.user = user;
    }
  } catch (err) {
    // Invalid token — ignore and continue as guest
  }
  next();
};

module.exports = { userAuth, userAuthOptional };

