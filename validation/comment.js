const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCommentInput(data) {
	let errors = {};

	data.text = !isEmpty(data.text) ? data.text : "";

	if (!Validator.isLength(data.text, { min: 5, max: 300 })) {
		errors.text = "Comment must be between 5 and 300 characters";
	}

	if (Validator.isEmpty(data.text)) {
		errors.text = "Comment field is required";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};