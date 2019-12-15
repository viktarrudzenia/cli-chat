import axios from 'axios';

export default function getAllData () {
	return axios.get('http://localhost:3001/api/v1/things/').then((data) => data.data);
}
