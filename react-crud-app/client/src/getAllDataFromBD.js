import axios from 'axios';

const url = 'http://localhost:3001/api/v1/things/';

export default function getAllDataFromBD () {
	return axios.get(url).then((data) => data.data);
}
