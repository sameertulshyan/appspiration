import {
	ADD_IDEA,
	GET_IDEAS,
	GET_IDEA,
	GET_AUTHOR,
	DELETE_IDEA,
	IDEA_LOADING
} from "../actions/types";

const initialState = {
	ideas: [],
	idea: {},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case IDEA_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_IDEAS:
			return {
				...state,
				ideas: action.payload,
				loading: false
			};
		case GET_IDEA:
			return {
				...state,
				idea: action.payload,
				loading: false
			};
		case GET_AUTHOR:
			return {
				...state,
				author: action.payload,
				loading: false
			};
		case ADD_IDEA:
			return {
				...state,
				ideas: [action.payload, ...state.ideas]
			};
		case DELETE_IDEA:
			return {
				...state,
				ideas: state.ideas.filter(idea => idea._id !== action.payload)
			};
		default:
			return state;
	}
}