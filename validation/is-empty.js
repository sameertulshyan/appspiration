// function to check if some form input is empty, depending on input type
module.exports = function isEmpty(value) {
	return (
		value === undefined ||
		value === null ||
		(typeof value === "object" && Object.keys(value).length === 0) ||
		(typeof value === "string" && value.trim().length === 0)
	);
};