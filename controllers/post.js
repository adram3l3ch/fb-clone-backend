const { BadRequestError, NotFoundError } = require('../errors');
const Post = require('../models/Post');
const User = require('../models/User');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { StatusCodes } = require('http-status-codes');

const createPost = async (req, res) => {
	const { caption } = req.body;
	let image = req.files?.image || '';
	if (!caption && !image) throw new BadRequestError('Expected a caption or image');

	const user = await User.findById(req.user.id);
	if (image) {
		const result = await cloudinary.uploader.upload(image.tempFilePath, {
			use_filename: true,
			folder: 'fb-clone-posts',
		});
		fs.unlinkSync(image.tempFilePath);
		const { secure_url: src, public_id } = result;
		image = { src, publicID: public_id };
	}
	const post = await Post.create({
		caption,
		image,
		createdBy: user._id,
		userDetails: { name: user.name, image: user.profileImage },
	});
	res.status(StatusCodes.CREATED).json({ post });
};

const getPosts = async (req, res) => {
	const { by, search, page = '1' } = req.query;
	const limitCount = search ? Infinity : 10;
	const skipCount = (+page - 1) * limitCount;
	const query = {};
	if (search) query.caption = new RegExp(search, 'i');
	if (by) query.createdBy = by;

	const posts = await Post.find(query).sort('-createdAt').limit(limitCount).skip(skipCount);
	res.status(StatusCodes.OK).json({ posts });
};

const getPost = async (req, res) => {
	const { id } = req.params;
	const posts = await Post.findById(id);
	if (!posts) throw new NotFoundError(`No post with id${id}`);
	res.status(StatusCodes.OK).json({ posts });
};

const likePost = async (req, res) => {
	const { add } = req.query;
	let posts = await Post.findById(req.body.id);
	if (!posts) throw new NotFoundError(`No post with id${req.body.id}`);
	if (add === 'true' && posts.likes.includes(req.user.id))
		throw new BadRequestError('Already liked');
	const action = add === 'true' ? '$push' : '$pull';

	posts = await Post.findByIdAndUpdate(
		req.body.id,
		{
			[action]: { likes: req.user.id },
		},
		{ new: true, runValidators: true }
	);
	res.status(StatusCodes.OK).json({ posts });
};

const commentPost = async (req, res) => {
	const posts = await Post.findByIdAndUpdate(
		req.body.id,
		{
			$push: { comments: { commentedBy: req.user.id, comment: req.body.comment } },
		},
		{ new: true, runValidators: true }
	);

	if (!posts) throw new NotFoundError(`No post with id${req.body.id}`);
	res.status(StatusCodes.OK).json({ posts });
};

const deletePost = async (req, res) => {
	const { id } = req.params;
	const post = await Post.findOneAndDelete({ _id: id, createdBy: req.user.id });
	post.image.publicID && (await cloudinary.uploader.destroy(post.image.publicID));
	res.status(StatusCodes.OK).json(post);
};

module.exports = { createPost, getPosts, likePost, commentPost, getPost, deletePost };
