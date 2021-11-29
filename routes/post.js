const express = require("express");
const { createPost, getAllPosts } = require("../controllers/post");
const router = express.Router();

router.route("/").post(createPost).get(getAllPosts);

module.exports = router;
