const express = require("express");
const { getUser, updateUser, updateDP, getUsers } = require("../controllers/user");
const router = express.Router();

router.route("/").get(getUsers);
router.route("/:id").get(getUser);
router.route("/update").patch(updateUser);
router.route("/update/dp").patch(updateDP);

module.exports = router;
