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
                <div className="flex flex-col items-center justify-center space-y-4 m-3">
                    <h1 className="font-bold text-xl p-5">Some content</h1>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center space-y-4 m-3">
                    <h1 className="font-bold text-xl p-5">Please login to see this page</h1>
                </div>
            )}
        </>
    )
}