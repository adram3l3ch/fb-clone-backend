const express = require("express");
const { createMessage, getMessage } = require("../controllers/message");
const router = express.Router();

router.route("/:chatID").post(createMessage).get(getMessage);

module.exports = router;
