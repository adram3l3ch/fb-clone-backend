const express = require("express");
const {
	createPost,
	getPosts,
	likePost,
	commentPost,
	deletePost,
	updatePost,
	deleteComment,
	editComment,
} = require("../controllers/post");
const authorize = require("../middleware/authorization");
const router = express.Router();

router.route("/").post(authorize, createPost).get(getPosts);
router.route("/like").patch(authorize, likePost);
router
	.route("/comment")
	.post(authorize, commentPost)
	.delete(authorize, deleteComment)
	.patch(authorize, editComment);
router.route("/:id").delete(authorize, deletePost).patch(authorize, updatePost);

module.exports = router;
