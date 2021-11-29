const express = require("express");
const { createPost, getAllPosts, likePost } = require("../controllers/post");
const router = express.Router();

router.route("/").post(createPost).get(getAllPosts).patch(likePost);

module.exports = router;
