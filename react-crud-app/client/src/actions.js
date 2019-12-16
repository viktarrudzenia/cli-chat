import fetchDataByIdFromBD from './fetchDataByIdFromBD';
import getAllDataFromBD from './getAllDataFromBD';
import postDataToBD from './postDataToBD';
import deleteByIdFromBD from './deleteByIdFromBD';
import updateDataByIdFromBD from './updateDataByIdFromBD';

export const POST_DATA = 'POST_DATA';
export const DELETE_DATA_BY_ID = 'DELETE_DATA_BY_ID';
export const GET_ALL_DATA = 'GET_ALL_DATA';
export const GET_DATA_BY_ID = 'GET_DATA_BY_ID';
export const UPDATE_DATA_BY_ID = 'UPDATE_DATA_BY_ID';

export function fetchDataById(id) {
	return (dispatch) => {
		fetchDataByIdFromBD(id).then((data) => {
			return dispatch(getMyDataByID(data))
		});
	}
}

export function getMyDataByID(data = []) {
	return {
		type: GET_DATA_BY_ID,
		payload: data,
	}
}

export function expectDeleteByIdFromBD(id) {
	return (dispatch) => {
		deleteByIdFromBD(id).then((data) => {
			if (data === 'OK') {
				getAllDataFromBD().then((alldata) => {
					return dispatch(addAllData(alldata))
				});
			}
		});
	}
}

export function deleteById(id = []) {
	return {
		type: DELETE_DATA_BY_ID,
		payload: id,
	}
}

export function expectPostDataToBD(title) {
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

export function postData(data = []) {
	return {
		type: POST_DATA,
		payload: data,
	}
}

export function expectGetAllDataFromBD() {
	return (dispatch) => {
		getAllDataFromBD().then((data) => {
			return dispatch(addAllData(data))
		});
	}
}

export function addAllData(data = []) {
	return {
		type: GET_ALL_DATA,
		payload: data,
	}
}

export function expectUpdateDataByIdFromBD(id, body) {
	return (dispatch) => {
		updateDataByIdFromBD(id, body).then((data) => {
			if (data === 'OK') {
				getAllDataFromBD().then((data) => {
					return dispatch(addAllData(data))
				});
			}
		});
	}
}

export function updateDataById(id) {
	return {
		type: UPDATE_DATA_BY_ID,
		payload: id,
	}
}

