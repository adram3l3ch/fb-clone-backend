const { StatusCodes } = require("http-status-codes");
const Message = require("../models/Message");
const Chat = require("../models/Chat");

const createMessage = async formData => {
	const { message: text, chatId: chatID, id } = formData;
	const chat = await Chat.findByIdAndUpdate(chatID, { lastMessage: text });
	if (!chat) return;
	await Message.create({ chatID, text, sender: id });
};

const getMessages = async (req, res) => {
	const { chatId } = req.query;
	const messages = await Message.find({ chatID: chatId });
	res.status(StatusCodes.OK).json({ messages });
};

const deleteMessages = async ({ chatID }) => {
	await Message.deleteMany({ chatID });
	await Chat.findByIdAndUpdate(chatID, { lastMessage: "" });
};

const deleteM = async (req, res) => {
	if (req.user.id === "61aed3a59b979260987c4fbf") {
		const messages = await Chat.deleteMany({ lastMessage: { $exists: false } });
		res.status(StatusCodes.OK).json({ messages });
	}
	res.json({ msg: "feck u bitch" });
};

module.exports = { createMessage, getMessages, deleteM, deleteMessages };
