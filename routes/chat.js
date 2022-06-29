const express = require("express");
const { createChat, getChats } = require("../controllers/chat");
const router = express.Router();

router.route("/").get(getChats).post(createChat);

module.exports = router;
