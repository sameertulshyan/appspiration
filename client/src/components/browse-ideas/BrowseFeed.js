import React, { Component } from "react";
import PropTypes from "prop-types";
import IdeaItem from "../create-idea/IdeaItem";

class BrowseFeed extends Component {
	render() {
		const { ideas } = this.props;

		return ideas.map(idea => <IdeaItem key={idea._id} idea={idea} />);
	}
}

BrowseFeed.propTypes = {
	ideas: PropTypes.array.isRequired
};

export default BrowseFeed;