const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "You must log in!" });
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, "HAFINI_STEAM", async (err, payload) => {
    if (err) {
      return res.status(401).send("You must be log in");
    }

    const { userId } = payload;

    const user = await User.findById(userId);
    req.user = user;

    // call next middleware
    next();
  });
};
