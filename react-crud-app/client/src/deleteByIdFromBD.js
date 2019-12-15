import axios from 'axios';

export default function deleteByIdFromBD (id) {
	return axios.delete(`http://localhost:3001/api/v1/things/${id}`).then((data) => data.data);
}