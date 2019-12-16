import axios from 'axios';

const url = 'http://localhost:3001/api/v1/things/';

export default function deleteByIdFromBD (id) {
	return axios.delete(`${url}${id}`).then((data) => data.data);
}