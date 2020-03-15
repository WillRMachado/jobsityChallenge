const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const secretTokenKey = process.env.SECRET_TOKEN_KEY;

const verifyToken = (req, res, next) => {
  const authToken = req.headers["authorization"];
  if (typeof authToken !== "undefined") {
    jwt.verify(authToken, secretTokenKey, (err, authData) => {
      if (err) {
        console.log(err.message);
        return res
          .status(403)
          .json({ error: "error, could not authenticate token" });
      } else {
        req.body.username = authData.username;
        next();
      }
    });
  } else {
    res.status(403).json({ error: "no token found" });
  }
};

module.exports = verifyToken;
