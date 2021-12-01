const { NotFoundError, BadRequestError } = require("../errors");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

const getUser = async (req, res) => {
   const { id } = req.params;
   const user = await User.findOne({ _id: id }).select({ password: 0 });

   if (!user) {
      throw new NotFoundError(`No user exist with id ${id}`);
   }

   res.status(StatusCodes.OK).json({ user });
};

const getUsers = async (req, res) => {
   const { search } = req.query;
   if (search) {
      const regex = new RegExp(search, "i");
      const user = await User.find({ name: regex }).select({ password: 0 });
      res.status(StatusCodes.OK).json({ user });
   } else {
      const user = await User.find().select({ password: 0 });
      res.status(StatusCodes.OK).json({ user });
   }
};

const getUsersByIDs = async (req, res) => {
   const ids = Object.values(req.query);
   if (!ids) throw new BadRequestError("Expected atleast one id");
   const user = await User.find({ _id: { $in: ids } }).select({ password: 0 });
   res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
   const { id } = req.user;
   const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
   }).select({ password: 0 });

   if (!user) {
      throw new NotFoundError(`No user exist with id ${id}`);
   }
   const token = user.createJWT();

   res.status(StatusCodes.OK).json({ user, token });
};

const updateDP = async (req, res) => {
   const image = req.files?.image;
   if (!image) {
      throw new BadRequestError("Expected an image");
   }
   const result = await cloudinary.uploader.upload(image.tempFilePath, {
      use_filename: true,
      folder: "fb-clone-dps",
   });
   fs.unlinkSync(image.tempFilePath);
   const { secure_url: src } = result;

   const user = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage: src },
      { new: true, runValidators: true }
   ).select({ password: 0 });

   if (!user) throw new NotFoundError(`No user exist with id ${req.user.id}`);

   res.status(StatusCodes.OK).json({ user });
};

module.exports = { getUser, updateUser, updateDP, getUsers, getUsersByIDs };
