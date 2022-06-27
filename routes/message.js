const express = require("express");
const { getMessages, deleteM, deleteMessages } = require("../controllers/message");
const router = express.Router();

router.route("/").get(getMessages).delete(deleteMessages);
router.route("/delete").delete(deleteM);

module.exports = router;
