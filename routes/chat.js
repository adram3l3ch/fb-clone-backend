const express = require("express");
const { createChat, getChats } = require("../controllers/chat");
const router = express.Router();

router.route("/:receiverId").post(createChat);
router.route("/").get(getChats);

module.exports = router;
