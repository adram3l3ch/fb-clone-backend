const express = require("express");
const { createChat, getChats, deleteChat } = require("../controllers/chat");
const router = express.Router();

router.route("/").get(getChats).post(createChat).delete(deleteChat);

module.exports = router;
