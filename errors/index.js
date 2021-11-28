const NotFoundError = require("./not-found");
const BadRequestError = require("./bad-request");
const CustomError = require("./custom-error");
const AuthenticationError = require("./authentication-error");

module.exports = { NotFoundError, BadRequestError, CustomError, AuthenticationError };
