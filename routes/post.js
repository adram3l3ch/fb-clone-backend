const express = require("express");
const {
	createPost,
	getPosts,
	likePost,
	commentPost,
	deletePost,
	updatePost,
} = require("../controllers/post");
const router = express.Router();

router.route("/").post(createPost).get(getPosts);
router.route("/like").patch(likePost);
router.route("/comment").patch(commentPost);
router.route("/:id").delete(deletePost).patch(updatePost);

module.exports = router;
