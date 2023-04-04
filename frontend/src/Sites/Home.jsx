// Imports
import {useContext, useEffect, useState} from "react";
import {authContext} from "../App.jsx";
import {HiWifi} from "react-icons/hi";
import {axiosGet} from "../Others/requests.jsx";
import {useQuery} from "@tanstack/react-query";
import Loader from "../Components/Loading.jsx";

// Code
export default function Home() {

    const {isLoading} = useQuery(['Websites'], fetchWebsites)

    const {isUser} = useContext(authContext)
    const [websites, setWebsites] = useState([])

    function fetchWebsites() {
        const data = axiosGet("/api/v1/website/get", {}, true)

        data.then((response) => {
            setWebsites(response.data)
        })

        return data
    }

    if (isLoading) return <Loader/>

    return (
        <>
            <div className="flex flex-col items-center justify-center m-5 p-5">
                <h1 className="font-bold text-4xl p-5">Websites monitoring</h1>
            </div>

            <div className="flex flex-col items-center justify-center">
                <div
                    className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 bg-primary dark:bg-dark_primary dark:border-gray-700">
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            {websites && websites.map((item, index) => (
                                <div key={item.name}>
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4">
                                            {item.status === "Online" ? (
                                                <HiWifi className="h-5 w-5 text-green-400" aria-hidden="true"/>
                                            ) : (
                                                <HiWifi className="h-5 w-5 text-red-400" aria-hidden="true"/>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    {item.name}
                                                </p>
                                                <a href={item.url} className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    {item.url}
                                                </a>
                                            </div>
                                            {item.status === "Online" ? (
                                                <div className=" inline-flex items-center text-base font-semibold text-green-600">
                                                    {item.status}
                                                </div>
                                            ) : (
                                                <div className=" inline-flex items-center text-base font-semibold text-red-600">
                                                    {item.status}
                                                </div>
                                            )}

                                        </div>
                                    </li>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}