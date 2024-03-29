import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

class CommentFeed extends Component {
	render() {
		const { comments, ideaId } = this.props;

		return comments.map(comment => (
			<CommentItem key={comment._id} comment={comment} ideaId={ideaId} />
		));
	}
}

CommentFeed.propTypes = {
	comments: PropTypes.array.isRequired,
	ideaId: PropTypes.string.isRequired
};

export default CommentFeed;