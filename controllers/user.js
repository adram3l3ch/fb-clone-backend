const { NotFoundError } = require("../errors");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const getUser = async (req, res) => {
   const { id } = req.params;
   const user = await User.findOne({ _id: id });

   if (!user) {
      throw new NotFoundError(`No user exist with id ${id}`);
   }
   const { name, email, dob, about, createdAt, location } = user;
   res.status(StatusCodes.OK).json({
      user: { name, email, dob, about, createdAt, location },
   });
};

const updateUser = async (req, res) => {
   const { id } = req.user;
   const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
   });
   if (!user) {
      throw new NotFoundError(`No user exist with id ${id}`);
   }
   const token = user.createJWT();
   const { name, email, dob, about, createdAt, location } = user;
   res.status(StatusCodes.OK).json({
      user: { name, email, dob, about, createdAt, location },
      token,
      id,
   });
};

module.exports = { getUser, updateUser };
