import axios from 'axios';

export default function postDataToBD(body, title) {
    const data = {
        "title": title,
        "body": body,
    }
    const url = "http://localhost:3001/api/v1/things/";

    return axios.post(url, data).then((data) => {
        return data.data
    })
}
