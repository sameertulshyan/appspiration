import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import BrowseFeed from "./BrowseFeed";
import { getIdeas } from "../../actions/ideaActions";

class BrowseIdeas extends Component {
	componentDidMount() {
		this.props.getIdeas();
	}

	render() {
		const { ideas, loading } = this.props.idea;
		let ideaContent;

		if (ideas === null || loading) {
			ideaContent = <p>Loading...</p>;
		} else {
			ideaContent = <BrowseFeed ideas={ideas} />;
		}

		return (
			<div className="feed">
				<div className="container">
					<div className="row">
						<div className="col-md-12">{ideaContent}</div>
					</div>
				</div>
			</div>
		);
	}
}

BrowseIdeas.propTypes = {
	idea: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	idea: state.idea
});

export default connect(
	mapStateToProps,
	{ getIdeas }
)(BrowseIdeas);