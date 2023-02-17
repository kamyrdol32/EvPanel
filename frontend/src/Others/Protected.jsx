import React from 'react'
import {Navigate} from 'react-router-dom'
import {toast} from "react-toastify";

function Protected({isSignedIn, children}) {
    if (!isSignedIn) {
        toast.error("You need to be signed in to access this page")
        return <Navigate to="/login" replace/>
    }
    return children
}

export default Protected