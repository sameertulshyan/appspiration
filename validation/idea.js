const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateIdeaInput(data) {
	const errors = {};

	if (isEmpty(data.title)) {
		data.title = "";
	}

	if (!Validator.isLength(data.title, { min: 5, max: 300 })) {
		errors["title"] =
			"The title of your idea must be between 5 and 300 characters";
	}

	if (Validator.isEmpty(data.title)) {
		errors["title"] = "Your idea must have a title";
	}

	if (!Validator.isLength(data.description, { min: 10, max: 1000 })) {
		errors["description"] =
			"The description of your idea must be between 10 and 1000 characters";
	}

	if (Validator.isEmpty(data.description)) {
		errors["description"] = "Your idea must have a description";
	}

	if (Validator.isEmpty(data.technology)) {
		errors["technology"] =
			"You must indicate some basic technology needed to implement your idea";
	}

	if (data.hoursNeeded < 1) {
		errors["hoursNeeded"] =
			"The minimum amount of time for a project is 1 hour";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};