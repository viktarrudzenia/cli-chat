import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import {
	ADD_PEOPLE,
	REMOVE_PEOPLE,
	ADD_PEOPLES,
} from './actions';

const reducer = (state = [], action) => {
	switch (action.type) {
		case ADD_PEOPLE:
			return [...state, action.payload];
		case REMOVE_PEOPLE:
			return state.filter((i) => {
				return i.name !== action.payload.name;
			});
		case ADD_PEOPLES:
			console.log('ADD_PEOPLES in reducer', action)
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















