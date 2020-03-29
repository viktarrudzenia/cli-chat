import axios from 'axios';

const url = 'http://localhost:3001/api/v1/things/';

export default function fetchDataByIdFromBD (id) {
	return axios.get(`${url}${id}`).then((data) => data.data);
}