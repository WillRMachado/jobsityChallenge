const express = require("express");

const register = require("../controllers/register");
const login = require("../controllers/login");
const message = require("../controllers/message");

const verifyToken = require("../middleware/verifyToken");

const routes = express.Router();

routes.post("/register", register.store);
routes.post("/login", login.show);
routes.post("/message", verifyToken, message.store);
routes.get("/message", message.index);

module.exports = routes;
