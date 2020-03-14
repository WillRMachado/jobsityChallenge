// index, show(uma unica), store, update, destroy

const User = require("../model/User");
const bcrypt = require("bcrypt");

const saltRounds = 10;
SALT_WORK_FACTOR = 10;

module.exports = {
  async store(req, res) {
    const { username, email, password } = req.body;

    if (
      username === undefined ||
      email === undefined ||
      password === undefined
    ) {
      return res.status(400).json({ userStatus: "invalid data" });
    }

    const userAlreadyRegistered = await User.findOne({ email });
    if (userAlreadyRegistered) {
      return res.status(400).json({ error: "user already exists" });
    } else {
      bcrypt.hash(password, saltRounds, async function(err, hash) {
        if (err) return next(err);
        user = await User.create({ username, email, password: hash });
        // console.log(user);
        return res.status(201).json({ userStatus: "created" });
      });
    }
  }
};
