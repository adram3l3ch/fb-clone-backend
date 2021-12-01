const express = require("express");
const {
   getUser,
   updateUser,
   updateDP,
   getUsers,
   getUsersByIDs,
} = require("../controllers/user");
const router = express.Router();

router.route("/").get(getUsers);
router.route("/multiple").get(getUsersByIDs);
router.route("/:id").get(getUser);
router.route("/update").patch(updateUser);
router.route("/update/dp").patch(updateDP);

module.exports = router;
