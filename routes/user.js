const express = require("express");
const { updateUser, updateDP, getUsers } = require("../controllers/user");
const authorize = require("../middleware/authorization");
const router = express.Router();

router.route("/").get(getUsers).patch(authorize, updateUser);
router.route("/dp").patch(authorize, updateDP);

module.exports = router;
