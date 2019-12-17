import axios from 'axios';

export default function updateDataByIdFromBD(id, title, body) {
    const data = {
        "title": title,
        "body": body,
    }

    return axios.put(`http://localhost:3001/api/v1/things/${id}`, data).then((data) => {
        return data.data
    })
}