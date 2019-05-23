import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputNumber from "../common/InputNumber";
import { addIdea } from "../../actions/ideaActions";

const options = [
	{ value: "Beginner", label: "Beginner" },
	{ value: "Intermediate", label: "Intermediate" },
	{ value: "Advanced", label: "Advanced" }
];

class IdeaForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			description: "",
			technology: "",
			difficulty: "Beginner",
			hoursNeeded: 1,
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(newProps) {
		if (newProps.errors) {
			this.setState({ errors: newProps.errors });
		}
	}

	validateIdeaInput() {
		const validationErrors = {};

		if (this.state.title === "") {
			validationErrors["title"] = "Your idea must have a title";
		} else if (
			this.state.title.length < 5 ||
			this.state.title.length > 300
		) {
			validationErrors["title"] =
				"The title of your idea must be between 5 and 300 characters";
		}

		if (this.state.description === "") {
			validationErrors["description"] =
				"Your idea must have a description";
		} else if (
			this.state.description.length < 10 ||
			this.state.description.length > 300
		) {
			validationErrors["description"] =
				"The description of your idea must be between 10 and 1000 characters";
		}

		if (this.state.technology === "") {
			validationErrors["technology"] =
				"You must indicate some basic technology needed to implement your idea";
		}

		if (this.state.hoursNeeded < 1) {
			validationErrors["hoursNeeded"] =
				"The minimum amount of time for a project is 1 hour";
		}

		return {
			validationErrors,
			isValid: Object.keys(validationErrors).length === 0
		};
	}

	onSubmit(e) {
		e.preventDefault();

		const { user } = this.props.auth;

		const newIdea = {
			title: this.state.title,
			description: this.state.description,
			technology: this.state.technology,
			difficulty: this.state.difficulty,
			hoursNeeded: this.state.hoursNeeded
		};

		const { validationErrors, isValid } = this.validateIdeaInput();

		if (!isValid) {
			this.setState({ errors: validationErrors });
		} else {
			this.props.addIdea(newIdea);
			this.setState({
				title: "",
				description: "",
				technology: "",
				difficulty: "Beginner",
				hoursNeeded: 1
			});
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { errors } = this.state;

		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">
						Create your idea
					</div>
					<div className="card-body">
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<TextFieldGroup
									placeholder="Title of your Idea"
									name="title"
									value={this.state.title}
									onChange={this.onChange}
									error={errors.title}
								/>
								<TextAreaFieldGroup
									placeholder="Describe your idea"
									name="description"
									value={this.state.description}
									onChange={this.onChange}
									error={errors.description}
								/>
								<TextAreaFieldGroup
									placeholder="Which technologies might be used to implement your idea"
									name="technology"
									value={this.state.technology}
									onChange={this.onChange}
									error={errors.technology}
								/>
								<SelectListGroup
									placeholder="Difficulty"
									name="difficulty"
									value={this.state.difficulty}
									onChange={this.onChange}
									options={options}
									error={errors.difficulty}
									info="Estimate the level of experience needed to implement this idea"
								/>
								<InputNumber
									name="hoursNeeded"
									value={this.state.hoursNeeded}
									onChange={this.onChange}
									error={errors.hoursNeeded}
									info="Estimate the number of hours needed to implement this idea"
								/>
							</div>
							<button type="submit" className="btn btn-dark">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

IdeaForm.propTypes = {
	addIdea: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ addIdea }
)(IdeaForm);