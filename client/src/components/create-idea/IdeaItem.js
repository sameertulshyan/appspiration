import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deleteIdea } from "../../actions/ideaActions";

class IdeaItem extends Component {
	onDeleteClick(id) {
		this.props.deleteIdea(id);
	}

	render() {
		const { idea, auth, showActions } = this.props;

		return (
			<div className="card card-body mb-3">
				<div className="row">
					<div className="col-md-2">
						<p className="text-center">{idea.author}</p>
					</div>
					<div className="col-md-10">
						Title:
						<p className="lead">{idea.title}</p>
						Description:
						<p className="lead">{idea.description}</p>
						Technology:
						<p className="lead">{idea.technology}</p>
						Difficulty:
						<p className="lead">{idea.difficulty}</p>
						Hours Needed:
						<p className="lead">{idea.hoursNeeded}</p>
						{showActions ? (
							<span>
								<Link
									to={`/ideas/${idea._id}`}
									className="btn btn-info mr-1"
								>
									Comments
								</Link>
								{idea.user === auth.user.id ? (
									<button
										onClick={this.onDeleteClick.bind(
											this,
											idea._id
										)}
										type="button"
										className="btn btn-danger mr-1"
									>
										<i className="fas fa-times" />
									</button>
								) : null}
							</span>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

IdeaItem.defaultProps = {
	showActions: true
};

IdeaItem.propTypes = {
	deleteIdea: PropTypes.func.isRequired,
	idea: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ deleteIdea }
)(IdeaItem);