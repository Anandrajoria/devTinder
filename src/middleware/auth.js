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
