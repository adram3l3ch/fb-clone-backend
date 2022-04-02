const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
	{
		members: [String],
		lastMessage: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Chat', ChatSchema);
