import React, { Component } from "react";
import PropTypes from "prop-types";
import IdeaItem from "./IdeaItem";
import { connect } from "react-redux";

class IdeaFeed extends Component {
	render() {
		const { ideas, auth } = this.props;

		return ideas
			.filter(idea => {
				return idea.user === auth.user.id;
			})
			.map(idea => <IdeaItem key={idea._id} idea={idea} />);
	}
}

IdeaFeed.defaultProps = {
	showActions: true
};

IdeaFeed.propTypes = {
	ideas: PropTypes.array.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(IdeaFeed);