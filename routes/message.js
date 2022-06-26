const express = require("express");
const { getMessages, deleteM } = require("../controllers/message");
const router = express.Router();

router.route("/").get(getMessages);
router.route("/delete").delete(deleteM);

module.exports = router;
