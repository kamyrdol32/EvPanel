// Imports
import {axiosGet, axiosPost, getCookie} from "../Others/requests.jsx";
import useLocalStorage from "use-local-storage";

// Code
export default function useAuth() {
    const [user, setUser] = useLocalStorage("user", null)

    function removeUser() {
        axiosGet("/api/v1/auth/logout")
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
            const data = axiosPost("/api/v1/auth/isAuthenticated", {}, true)

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

