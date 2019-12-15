import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import {
	GET_DATA,
	ADD_PEOPLE,
	REMOVE_PEOPLE,
	ADD_PEOPLES,
} from './actions';

const reducer = (state = [], action) => {
	switch (action.type) {
		case GET_DATA:
			return [...action.payload];
		case ADD_PEOPLE:
			return [state, action.payload];
		case REMOVE_PEOPLE:
			return state.filter((i) => {
				return i.name !== action.payload.name;
			});
		case ADD_PEOPLES:
			return [...action.payload];
		default:
			return state;
	}
};

const store = createStore(
	reducer,
	applyMiddleware(ReduxThunk)
);

export default store;















