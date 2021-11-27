const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
   const user = await User.create({ ...req.body });
   const { name, email, dob, location, about, _id: id } = user;
   const token = user.createJWT();
   res.status(StatusCodes.CREATED).json({
      user: { name, email, dob, location, about, id },
      token,
   });
};

const login = async (req, res) => {
   const user = await User.findOne({ email: req.body.email });
   if (user.comparePassword(req.body.password)) {
      const { name, email, dob, location, about, _id: id } = user;
      const token = user.createJWT();
      res.status(StatusCodes.CREATED).json({
         user: { name, email, dob, location, about, id },
         token,
      });
   }
};

module.exports = { register, login };
