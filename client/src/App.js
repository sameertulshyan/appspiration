import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import CreateIdea from "./components/create-idea/CreateIdea";
import BrowseIdeas from "./components/browse-ideas/BrowseIdeas";
import Idea from "./components/idea/Idea";
import NotFound from "./components/not-found/NotFound";

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
	// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info and exp
	const decoded = jwt_decode(localStorage.jwtToken);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));

	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());
		// Clear current Profile
		// Redirect to login
		window.location.href = "/login";
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Navbar />
						<Route exact path="/" component={Landing} />
						<Route
							exact
							path="/browse-ideas"
							component={BrowseIdeas}
						/>
						<div className="container">
							<Route
								exact
								path="/register"
								component={Register}
							/>
							<Route exact path="/login" component={Login} />
							<Switch>
								<Route
									exact
									path="/ideas/:id"
									component={Idea}
								/>
							</Switch>
							<Switch>
								<PrivateRoute
									exact
									path="/create-idea"
									component={CreateIdea}
								/>
							</Switch>
							<Route
								exact
								path="/not-found"
								component={NotFound}
							/>
						</div>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;