const express = require("express");
const {
	createPost,
	getPosts,
	likePost,
	commentPost,
	deletePost,
	updatePost,
} = require("../controllers/post");
const authorize = require("../middleware/authorization");
const router = express.Router();

router.route("/").post(authorize, createPost).get(getPosts);
router.route("/like").patch(authorize, likePost);
router.route("/comment").patch(authorize, commentPost);
router.route("/:id").delete(authorize, deletePost).patch(authorize, updatePost);

module.exports = router;
