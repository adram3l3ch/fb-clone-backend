const express = require("express");
const { updateUser, updateDP, getUsers } = require("../controllers/user");
const router = express.Router();

router.route("/").get(getUsers).patch(updateUser);
router.route("/dp").patch(updateDP);

module.exports = router;
