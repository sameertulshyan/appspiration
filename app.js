// bring in necessary modules
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// basic express and configuration
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// database connection string
mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost/appspiration",
	{ useNewUrlParser: true }
);

// bring in API routes
const users = require("./routes/api/users");
const ideas = require("./routes/api/ideas");

// middleware for using passport
app.use(passport.initialize());
require("./config/passport")(passport);

// middleware for using routes
app.use("/api/users", users);
app.use("/api/ideas", ideas);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.listen(process.env.PORT || 5000);