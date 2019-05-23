const mongoose = require("mongoose");

// Schema representing a Project Idea
const IdeaSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	author: { type: String, required: true },
	title: { type: String, required: true },
	description: { type: String, required: true },
	technology: { type: String, required: true },
	difficulty: {
		type: String,
		enum: ["Beginner", "Intermediate", "Advanced"]
	},
	hoursNeeded: { type: Number, min: 1 },
	date: { type: Date, default: Date.now },
	comments: [
		{
			user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
			name: { type: String },
			text: { type: String, required: true },
			date: { type: Date, default: Date.now }
		}
	]
});

module.exports = Idea = mongoose.model("ideas", IdeaSchema);