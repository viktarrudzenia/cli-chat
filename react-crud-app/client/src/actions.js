import fetch from './fetch';

export const ADD_PEOPLE = 'ADD_PEOPLE';
export const REMOVE_PEOPLE = 'REMOVE_PEOPLE';
export const ADD_PEOPLES = 'ADD_PEOPLES';

export function addPeople (name) {
	return {
		type: ADD_PEOPLE,
		payload: {
			value: name,
		}
	}
}

export function addPeoples (peoples = []) {
	return {
		type: ADD_PEOPLES,
		payload: peoples,
	}
}

export function fetchPeople () {
	return (dispatch) => {
		fetch().then((data) => dispatch(
			addPeoples(data)
		));
	}
}







