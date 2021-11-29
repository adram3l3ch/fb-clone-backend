const express = require("express");
const { getUser, updateUser, updateDP } = require("../controllers/user");
const router = express.Router();

router.route("/:id").get(getUser);
router.route("/update").patch(updateUser);
router.route("/update/dp").patch(updateDP);

module.exports = router;
