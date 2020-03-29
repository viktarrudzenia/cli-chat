import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import {
	POST_DATA,
	DELETE_DATA_BY_ID,
	GET_DATA_BY_ID,
	GET_ALL_DATA,
	UPDATE_DATA_BY_ID,
} from './actions';

const reducer = (state = [], action) => {
	switch (action.type) {
		case POST_DATA:
			return [...action.payload];
		case GET_DATA_BY_ID:
			return [...action.payload];
		case UPDATE_DATA_BY_ID:
			return [...action.payload];
		case GET_ALL_DATA:
			return [...action.payload];
		case DELETE_DATA_BY_ID:
			return [...action.payload]
		default:
			return state;
	}
};

const exampleInitialState = {
	// add next
}

export function initializeStore(initialState = exampleInitialState) {
	return createStore(
		reducer,
		initialState,
		applyMiddleware(ReduxThunk)
	)
}