import axios from 'axios';

export default function postDataToBD(body, title) {
    const data = {
        "title": title,
        "body": body,
    }

    return axios.post('http://localhost:3001/api/v1/things/', data).then((data) => {
        return data.data
    })
}
