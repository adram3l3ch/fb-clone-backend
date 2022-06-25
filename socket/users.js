const jwt = require("jsonwebtoken");
const axios = require("axios");

const { serverURL } = require("../URI");

let usersOnline = [];

const addUser = (id, socketID) => {
	usersOnline = usersOnline.filter(user => user.id !== id);
	usersOnline.push({ id, socketID });
	return usersOnline;
};
const getSocketID = id => {
	return usersOnline.find(user => user.id === id)?.socketID;
};

const getUserID = sid => {
	return usersOnline.find(user => user.socketID === sid)?.id;
};

const removeUser = sid => {
	usersOnline = usersOnline.filter(user => user.socketID !== sid);
	return usersOnline;
};

const createMessage = async (chatID, id, message) => {
	const token = jwt.sign(
		{ id, name: "test", profileImage: "" },
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_LIFETIME,
		}
	);
	await axios.post(
		`${serverURL}/message/${chatID}`,
		{ text: message },
		{
			headers: {
				authorization: `Bearer ${token}`,
			},
		}
	);
};

module.exports = { addUser, getUserID, getSocketID, removeUser, createMessage };
