import axios from "axios";
import {toast} from "react-toastify";


let default_url = "http://localhost:5000";

export function axiosGet(url, tokenRequired) {

    let headers = {
        'Content-Type': 'application/json',
    }

    return axios.get(default_url + url, {headers: headers})
}


export function axiosPost(url, data, tokenRequired) {

    let headers = {
        'Content-Type': 'application/json',
    }

    const postData = axios.post(default_url + url, data, {headers: headers})

    postData
        .then((response) => {
            console.log(response)
            if (response.status === 200) {
                toast.success(response.data.message)
            }
        })
        .catch((error) => {
            console.log(error)
            toast.error(error.response.data.error)
        })

    return postData
}