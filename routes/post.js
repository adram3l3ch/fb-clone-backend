const express = require("express");
const {
	createPost,
	getPosts,
	likePost,
	commentPost,
	getPost,
	deletePost,
	updatePost,
} = require("../controllers/post");
const router = express.Router();

router.route("/").post(createPost).get(getPosts);
router.route("/comment").patch(commentPost);
router.route("/like").patch(likePost);
router.route("/:id").get(getPost).delete(deletePost).patch(updatePost);

module.exports = router;
