// Imports
import {useContext} from "react";
import {authContext} from "../App.jsx";

// Code
export default function Home() {

    const {isUser} = useContext(authContext)

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