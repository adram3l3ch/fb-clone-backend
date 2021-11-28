const express = require("express");
const { getUser, updateUser } = require("../controllers/user");
const router = express.Router();
const authorizationMiddleware = require("../middleware/authorization");

router.route("/:id").get(getUser);
router.route("/update").patch(authorizationMiddleware, updateUser);

module.exports = router;
