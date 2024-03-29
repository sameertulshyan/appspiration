import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const InputNumber = ({ name, placeholder, value, error, info, onChange }) => {
	return (
		<div className="form-group">
			<input
				className={classnames("form-control form-control-lg", {
					"is-invalid": error
				})}
				type="number"
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
			/>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

InputNumber.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.number.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired
};

export default InputNumber;