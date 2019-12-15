import fetchDataByIdFromBD from './fetchDataByIdFromBD';
import getAllDataFromBD from './getAllDataFromBD';
import postDataToBD from './postDataToBD';

export const GET_DATA = 'GET_DATA';
export const ADD_PEOPLE = 'ADD_PEOPLE';
export const REMOVE_PEOPLE = 'REMOVE_PEOPLE';
export const ADD_PEOPLES = 'ADD_PEOPLES';

export function getMyDataByID(data = []) {
	return {
		type: GET_DATA,
		payload: data,
	}
}

export function fetchDataById(id) {
	return (dispatch) => {
		fetchDataByIdFromBD(id).then((data) => {
			return dispatch(getMyDataByID(data))
		});
	}
}

export function addPeople(peoples = {}) {
	return {
		type: ADD_PEOPLE,
		payload: {
			"title": peoples,
			"body": peoples,
			"_id": peoples+1,
		},
	}
}

export function addPeopleMongoDB(title) {
	return (dispatch) => {
		postDataToBD(title).then((data) => {
			if (data === 'Created') {
				getAllDataFromBD().then((data) => {
					return dispatch(addAllData(data))
				});
			}
		});
	}
}

export function addAllData(data = []) {
	return {
		type: ADD_PEOPLES,
		payload: data,
	}
}
 
export function fetchPeople() {
	return (dispatch) => {
		getAllDataFromBD().then((data) => {
			return dispatch(addAllData(data))
		});
	}
}







