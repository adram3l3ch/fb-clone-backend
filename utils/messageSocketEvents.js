const Chat = require("../models/Chat");
const Message = require("../models/Message");

const createMessage = async formData => {
	const { message: text, chatId: chatID, id } = formData;
	const chat = await Chat.findByIdAndUpdate(chatID, { lastMessage: text });
	if (!chat) return;
	await Message.create({ chatID, text, sender: id });
};

const deleteMessages = async ({ chatID }) => {
	await Message.deleteMany({ chatID });
	await Chat.findByIdAndUpdate(chatID, { lastMessage: "" });
};

const deleteChat = async ({ chatID }) => {
	await Chat.findByIdAndDelete(chatID);
	await Message.deleteMany({ chatID });
};

module.exports = { createMessage, deleteMessages, deleteChat };
