import axios from 'axios';

export default function fetchDataByIdFromBD (id) {
	return axios.get(`http://localhost:3001/api/v1/things/${id}`).then((data) => data.data);
}