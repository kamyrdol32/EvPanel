// Imports
import {useContext, useEffect} from "react";
import {authContext} from "../App.jsx";
import {toast} from "react-toastify";

// Code
export default function Home() {

    const {isUser} = useContext(authContext)

    useEffect(() => {
        if (!isUser()) {
            toast.info("Demo account:")
            toast.info("admin/123456")
        }
    })

    return (
        <>
            {isUser() ? (
                <div className="flex flex-col items-center justify-center m-3">
                    <h1 className="font-bold text-4xl p-5">Some content in the futere</h1>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center m-5 p-5">
                    <h1 className="font-bold text-4xl p-5">Please login to see this page</h1>
                    <h3 className="text-xl p-5">This application is a personal project aimed at acquiring new
                        programming knowledge. Its sole functionality currently allows for managing resumes sent to
                        different companies.</h3>
                    <h5 className="text-xl">Demo account:</h5>
                    <h5 className="text-xl">admin/123456</h5>

                </div>
            )}
        </>
    )
}