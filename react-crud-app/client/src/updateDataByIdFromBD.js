import axios from 'axios';

export default function updateDataByIdFromBD(id, body) {
    const data = {
        "title": body,
        "body": body,
    }

    return axios.put(`http://localhost:3001/api/v1/things/${id}`, data).then((data) => {
        return data.data
    })
}
