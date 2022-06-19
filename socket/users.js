const jwt = require("jsonwebtoken");
const axios = require("axios");

// const URL = 'http://localhost:5000/api/v1/message';
const URL = "https://adramelech-fb-clone.herokuapp.com/api/v1/message";

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
		`/${chatID}`,
		{ text: message },
		{
			headers: {
				authorization: `Bearer ${token}`,
			},
		}
	);
};

module.exports = { addUser, getUserID, getSocketID, removeUser, createMessage };
