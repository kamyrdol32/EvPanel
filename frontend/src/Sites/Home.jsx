// Imports
import {useContext} from "react";
import {authContext} from "../App.jsx";

// Code
export default function Home() {

    const {isUser} = useContext(authContext)

    return (
        <>
            {isUser() ? (
                <div>
                    fgddfgfdgfdg
                </div>
            ) : (
                <div>
                    <h1>Please login to see this page</h1>
                </div>
            )}
        </>
    )
}