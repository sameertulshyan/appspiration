const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// import the mongoose model for an Idea
const Idea = require("../../models/Idea");
const User = require("../../models/User");

// using validator API to validate form input
const validateIdeaInput = require("../../validation/idea");

const validateCommentInput = require("../../validation/comment");

// route to get all ideas
router.get("/", (req, res) => {
	Idea.find()
		.sort({ date: -1 })
		.then(ideas => res.json(ideas))
		.catch(err => res.status(404).json({ noideasfound: "No ideas found" }));
});

// route for a particular idea (based on slug)
router.get("/:id", (req, res) => {
	Idea.findById(req.params.id)
		.then(idea => {
			if (idea) {
				res.json(idea);
			} else {
				res.status(404).json({
					noideasfound:
						"We could not find the idea you were looking for"
				});
			}
		})
		.catch(err =>
			res.status(404).json({
				noideasfound: "We could not find the idea you were looking for"
			})
		);
});

router.get("/name/:id", (req, res) => {
	Idea.findById(req.params.id)
		.then(idea => {
			if (idea) {
				User.findById(idea.user)
					.then(user => {
						if (user) {
							res.json(user);
						} else {
							res.status(404).json({
								nouserfound:
									"We could not find the user you were looking for"
							});
						}
					})
					.catch(err =>
						res.status(404).json({
							nouserfound:
								"We could not find the user you were looking for"
						})
					);
			} else {
				res.status(404).json({
					noideasfound:
						"We could not find the idea you were looking for"
				});
			}
		})
		.catch(err =>
			res.status(404).json({
				noideasfound: "We could not find the idea you were looking for"
			})
		);
});

// route to create a new idea (user must be logged in!)
router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		// call our validator function on the form data, get the errors or validity
		const { errors, isValid } = validateIdeaInput(req.body);

		// if invalid input
		if (!isValid) {
			// return errors to page
			return res.status(400).json(errors);
		} else {
			const newIdea = new Idea({
				user: req.user.id,
				author: req.user.name,
				title: req.body.title,
				description: req.body.description,
				technology: req.body.technology,
				difficulty: req.body.difficulty,
				hoursNeeded: req.body.hoursNeeded
			});

			newIdea.save().then(idea => res.json(idea));
		}
	}
);

router.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Idea.findById(req.params.id)
			.then(idea => {
				if (idea.user.toString() !== req.user.id) {
					return res.status(401).json({
						notauthorized:
							"This User does not have permission to delete this Idea"
					});
				} else {
					idea.remove().then(() =>
						res.json({
							success: true
						})
					);
				}
			})
			.catch(err =>
				res.status(404).json({
					ideanotfound: "No idea found with matching id"
				})
			);
	}
);

// route for posting a new comment on an idea
router.post(
	"/comment/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validateCommentInput(req.body);

		// Check Validation
		if (!isValid) {
			// If any errors, send 400 with errors object
			return res.status(400).json(errors);
		}

		Idea.findById(req.params.id)
			.then(idea => {
				const newComment = {
					text: req.body.text,
					name: req.body.name,
					user: req.user.id
				};

				// Add to comments array
				idea.comments.unshift(newComment);

				// Save
				idea.save().then(idea => res.json(idea));
			})
			.catch(err =>
				res.status(404).json({ ideanotfound: "No idea found" })
			);
	}
);

// route to delete a comment
router.delete(
	"/comment/:id/:comment_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Idea.findById(req.params.id)
			.then(idea => {
				// Check to see if comment exists
				if (
					idea.comments.filter(
						comment =>
							comment._id.toString() === req.params.comment_id
					).length === 0
				) {
					return res
						.status(404)
						.json({ commentnotexists: "Comment does not exist" });
				}

				// Get index of comment that we want to remove
				const removeIndex = idea.comments
					.map(item => item._id.toString())
					.indexOf(req.params.comment_id);

				// Splice comment out of array
				idea.comments.splice(removeIndex, 1);

				idea.save().then(idea => res.json(idea));
			})
			.catch(err =>
				res.status(404).json({ ideanotfound: "No idea found" })
			);
	}
);

module.exports = router;