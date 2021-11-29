const express = require("express");
const { getUser, updateUser } = require("../controllers/user");
const router = express.Router();

router.route("/:id").get(getUser);
router.route("/update").patch(updateUser);

module.exports = router;
