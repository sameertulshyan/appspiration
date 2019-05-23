import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import IdeaForm from "./IdeaForm";
import IdeaFeed from "./IdeaFeed";
import { getIdeas } from "../../actions/ideaActions";

class CreateIdea extends Component {
	componentDidMount() {
		this.props.getIdeas();
	}

	render() {
		const { ideas, loading } = this.props.idea;
		let ideaContent;

		if (ideas === null || loading) {
			ideaContent = <p>Loading</p>;
		} else {
			ideaContent = <IdeaFeed ideas={ideas} />;
		}

		return (
			<div className="feed">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<IdeaForm />
							{ideaContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CreateIdea.propTypes = {
	idea: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	idea: state.idea
});

export default connect(
	mapStateToProps,
	{ getIdeas }
)(CreateIdea);