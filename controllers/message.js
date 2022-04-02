const Message = require('../models/Message');
const { StatusCodes } = require('http-status-codes');
const Chat = require('../models/Chat');

const createMessage = async (req, res) => {
	const { text } = req.body;
	const { chatID } = req.params;
	const message = await Message.create({
		chatID,
		text,
		sender: req.user.id,
	});
	await Chat.findByIdAndUpdate(chatID, { lastMessage: text });
	res.status(StatusCodes.CREATED).json({ message });
};

const getMessage = async (req, res) => {
	const { chatID } = req.params;
	const message = await Message.find({ chatID });
	res.status(StatusCodes.OK).json({ message });
};

module.exports = { createMessage, getMessage };
