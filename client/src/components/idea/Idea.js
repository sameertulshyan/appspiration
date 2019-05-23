import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import IdeaItem from "../create-idea/IdeaItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import { getIdea } from "../../actions/ideaActions";

class Idea extends Component {
	componentDidMount() {
		this.props.getIdea(this.props.match.params.id);
	}

	render() {
		const { idea, loading } = this.props.idea;
		let ideaContent;

		if (idea === null || loading || Object.keys(idea).length === 0) {
			ideaContent = <p>Loading...</p>;
		} else {
			ideaContent = (
				<div>
					<IdeaItem idea={idea} showActions={false} />
					<CommentForm ideaId={idea._id} />
					<CommentFeed ideaId={idea._id} comments={idea.comments} />
				</div>
			);
		}

		return (
			<div className="idea">
				<div className="container">
					<div className="row">
						<div className="col-md-12">{ideaContent}</div>
					</div>
				</div>
			</div>
		);
	}
}

Idea.propTypes = {
	getIdea: PropTypes.func.isRequired,
	idea: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	idea: state.idea
});

export default connect(
	mapStateToProps,
	{ getIdea }
)(Idea);