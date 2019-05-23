import axios from "axios";

import {
	ADD_IDEA,
	GET_ERRORS,
	CLEAR_ERRORS,
	GET_IDEAS,
	GET_IDEA,
	GET_AUTHOR,
	IDEA_LOADING,
	DELETE_IDEA
} from "./types";

// Add Idea
export const addIdea = ideaData => dispatch => {
	dispatch(clearErrors());
	axios
		.post("/api/ideas", ideaData)
		.then(res =>
			dispatch({
				type: ADD_IDEA,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Get Ideas
export const getIdeas = () => dispatch => {
	dispatch(setIdeaLoading());
	axios
		.get("/api/ideas")
		.then(res =>
			dispatch({
				type: GET_IDEAS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_IDEAS,
				payload: null
			})
		);
};

// Get Idea
export const getIdea = id => dispatch => {
	dispatch(setIdeaLoading());
	axios
		.get(`/api/ideas/${id}`)
		.then(res =>
			dispatch({
				type: GET_IDEA,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_IDEA,
				payload: null
			})
		);
};

export const getAuthor = id => dispatch => {
	dispatch(setIdeaLoading());
	axios
		.get(`/api/ideas/name/${id}`)
		.then(res =>
			dispatch({
				type: GET_AUTHOR,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_AUTHOR,
				payload: null
			})
		);
};

// Delete Idea
export const deleteIdea = id => dispatch => {
	axios
		.delete(`/api/ideas/${id}`)
		.then(res =>
			dispatch({
				type: DELETE_IDEA,
				payload: id
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Add Comment
export const addComment = (ideaId, commentData) => dispatch => {
	dispatch(clearErrors());
	axios
		.post(`/api/ideas/comment/${ideaId}`, commentData)
		.then(res =>
			dispatch({
				type: GET_IDEA,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Delete Comment
export const deleteComment = (ideaId, commentId) => dispatch => {
	axios
		.delete(`/api/ideas/comment/${ideaId}/${commentId}`)
		.then(res =>
			dispatch({
				type: GET_IDEA,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Set loading state
export const setIdeaLoading = () => {
	return {
		type: IDEA_LOADING
	};
};

// Clear errors
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};