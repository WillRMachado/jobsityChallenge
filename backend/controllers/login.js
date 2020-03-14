// index, show(uma unica), store, update, destroy

const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async show(req, res) {
    const { email, password } = req.body;
    if (email === undefined || password === undefined) {
      return res.status(400).json({ error: "invalid request" });
    }

    const user = await User.findOne({ email });

    const passwordCheck = async (candidatePassword, dbPassword) => {
      bcrypt.compare(candidatePassword, dbPassword, function(err, isMatch) {
        //ANCHOR err
        if (isMatch) {
          jwt.sign(JSON.stringify(user), "secretkey", (err, token) => {
            res.json({ token });
          });
          return isMatch;
        } else {
          return res.status(400).json({ error: "invalid password" });
        }
      });
    };


    if (!user) {
      return res.status(400).json({ error: "user does not exist" });
    } else {
      passwordCheck(password, user.password);
    }
  }
};
