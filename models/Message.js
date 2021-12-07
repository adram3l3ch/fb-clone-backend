const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
   {
      chatID: {
         type: mongoose.Types.ObjectId,
         ref: "Chat",
      },
      text: String,
      sender: {
         type: mongoose.Types.ObjectId,
         ref: "User",
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
