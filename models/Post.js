const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
   {
      caption: {
         type: String,
      },
      image: {
         src: {
            type: String,
         },
      },
      createdBy: {
         type: mongoose.Types.ObjectId,
         ref: "User",
         required: true,
      },
      likes: {
         type: [String],
      },
      comments: [
         {
            commentedBy: {
               type: mongoose.Types.ObjectId,
               ref: "User",
               required: true,
            },
            comment: {
               type: String,
               required: true,
            },
            commentedAt: {
               type: Date,
               default: new Date(),
               required: true,
            },
         },
      ],
   },
   { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
