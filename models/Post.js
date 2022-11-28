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
			publicID: {
				type: String,
			},
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},
		userDetails: {
			name: {
				type: String,
				required: true,
			},
			image: {
				type: String,
			},
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
				replies: [
					{
						commentedBy: {
							type: mongoose.Types.ObjectId,
							ref: "User",
							required: true,
						},
						commentId: {
							type: mongoose.Types.ObjectId,
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
						replyTo: {
							type: String,
							required: true,
						},
					},
				],
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
