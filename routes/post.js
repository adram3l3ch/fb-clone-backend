const express = require("express");
const {
   createPost,
   getPosts,
   likePost,
   commentPost,
   getPost,
   deletePost,
} = require("../controllers/post");
const router = express.Router();

router.route("/").post(createPost).get(getPosts);
router.route("/:id").get(getPost).delete(deletePost);
router.route("/like").patch(likePost);
router.route("/comment").patch(commentPost);

module.exports = router;
