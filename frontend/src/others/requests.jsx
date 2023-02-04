import axios from "axios";


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

    return axios.post(default_url + url, data, {headers: headers})
}