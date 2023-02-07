// Imports
import {axiosGet, axiosPost, getCookie} from "../Others/requests.jsx";
import useLocalStorage from "use-local-storage";
import {toast} from "react-toastify";
import {json} from "react-router-dom";

// Code
export default function useAuth() {
    const [user, setUser] = useLocalStorage("user", null)

    function removeUser() {
        axiosPost("/auth/logout", {}, false)
            .then((response) => {
                setUser(null)
                localStorage.removeItem("user")
                localStorage.removeItem("avatar")
                return true
            })
    }

    function isUser() {
        if (user !== null && getCookie('csrf_access_token')) {
            return true
        } else {
            return false
        }
    }


    function getUser() {
        if (user !== null && getCookie('csrf_access_token')) {
            return user
        } else {
            removeUser()
            return false
        }
    }


    function fetchAuthorization() {
        if (getCookie('csrf_access_token')) {
            const data = axiosPost("/auth/isAuthenticated", {}, true)

            data.then((response) => {
                    setUser(response.data.user)
                })
                .catch((error) => {
                    if (error.response.status === 401 || error.response.status === 400) {
                        removeUser()
                    }
                })

            return data
        } else
            return false
    }

    return {
        setUser,
        removeUser,
        isUser,
        getUser,
        fetchAuthorization
    }

}

