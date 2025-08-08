const User = require("../models/user");
const jwt = require("jsonwebtoken");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      res
        .status(401)
        .send({ message: "Authentication failed. Invalid token." });
    }

    const decodedObj = await jwt.verify(token, "SHUBHI@TINDER$1DEC");
    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      res
        .status(401)
        .send({ message: "Authentication failed. User not found." });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ message: "Authentication failed. Invalid token." });
  }
};

module.exports = { userAuth };


// const User = require("../models/user");
// const jwt = require("jsonwebtoken");

// const userAuth = async (req, res, next) => {
//   try {
//     const { token } = req.cookies;

//     if (!token) {
//       // ✅ FIXED: Added 'return' to stop the function after sending the response.
//       return res
//         .status(401)
//         .send({ message: "Authentication failed. No token provided." });
//     }

//     // Use the secret from environment variables for security
//     const decodedObj = jwt.verify(token, process.env.JWT_SECRET);
//     const { _id } = decodedObj;

//     const user = await User.findById(_id);
//     if (!user) {
//       // ✅ FIXED: Added 'return' here as well.
//       return res
//         .status(401)
//         .send({ message: "Authentication failed. User not found." });
//     }

//     // Success! Attach the user and continue.
//     req.user = user;
//     next();

//   } catch (error) {
//     // This will now only catch errors from jwt.verify()
//     // like an expired or malformed token.
//     res.status(401).send({ message: "Authentication failed. Invalid token." });
//   }
// };

module.exports = { userAuth };