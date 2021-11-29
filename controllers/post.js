const { BadRequestError } = require("../errors");
const Post = require("../models/Post");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const { StatusCodes } = require("http-status-codes");

const createPost = async (req, res) => {
   const { caption } = req.body;
   const image = req.files?.image;
   if (!caption && !image) {
      throw new BadRequestError("Expected a caption or image");
   }
   if (image) {
      const result = await cloudinary.uploader.upload(image.tempFilePath, {
         use_filename: true,
         folder: "fb-clone-posts",
      });
      fs.unlinkSync(image.tempFilePath);
      const { secure_url: src } = result;
      const post = await Post.create({ caption, image: { src }, createdBy: req.user.id });
      res.status(StatusCodes.CREATED).json({ post });
   } else {
      const post = await Post.create({ caption, createdBy: req.user.id });
      res.status(StatusCodes.CREATED).json({ post });
   }
};

const getAllPosts = async (req, res) => {
   const posts = await Post.find().sort("-createdAt");
   res.json({ posts });
};

module.exports = { createPost, getAllPosts };
