const Chat = require("../models/Chat");
const { StatusCodes } = require("http-status-codes");

const createChat = async (req, res) => {
   const { receiverId } = req.params;
   const existingConversations = await Chat.find({ members: { $in: [req.user.id] } });
   if (existingConversations) {
      const doesExist = existingConversations.filter(chat =>
         chat.members.includes(receiverId)
      );
      if (doesExist.length) {
         res.status(StatusCodes.OK).json({ cid: doesExist[0]._id });
         return;
      }
   }
   const chat = await Chat.create({ members: [req.user.id, receiverId] });
   res.status(StatusCodes.CREATED).json({ cid: chat._id });
};

const getChats = async (req, res) => {
   const chat = await Chat.find({ members: { $in: [req.user.id] } });
   res.status(StatusCodes.OK).json({ chat });
};

module.exports = { createChat, getChats };
