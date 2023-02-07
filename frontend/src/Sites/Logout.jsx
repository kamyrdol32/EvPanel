// Imports
import {useContext, useEffect} from "react";
import {authContext} from "../App.jsx";
import {useNavigate} from "react-router-dom";

// Code



export default function Logout() {

    const {removeUser} = useContext(authContext)
    const navigate = useNavigate();

    useEffect(() => {
        removeUser()
        navigate("/")
    }, [])
}
