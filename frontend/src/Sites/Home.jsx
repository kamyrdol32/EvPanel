// Imports
import {useContext, useEffect, useState} from "react";
import {authContext} from "../App.jsx";
import {HiWifi} from "react-icons/hi";
import {axiosGet} from "../Others/requests.jsx";
import {useQuery} from "@tanstack/react-query";
import Loader from "../Components/Loader.jsx";
import {useTranslation} from "react-i18next";

// Code
export default function Home() {

    const {t, i18n} = useTranslation();

    const {isUser} = useContext(authContext)
    const [websites, setWebsites] = useState([])

    const {isLoading} = useQuery(['Websites'], fetchWebsites, {refetchOnWindowFocus: false})
    useQuery(['WebsitesRefresh'], fetchWebsitesRefresh)


    useEffect(() => {
        fetchWebsites()
    }, [])


    function fetchWebsites() {
        const data = axiosGet("/api/v1/website/get", {}, false)

        data.then((response) => {
            setWebsites(response.data)
        })

        return data
    }

    function fetchWebsitesRefresh() {
        if (websites.length !== 0) {
            const data = axiosGet("/api/v1/website/refresh", {}, false)

            data.then((response) => {
                setWebsites(response.data)
            })

            return data
        }
    }

    if (isLoading) return <Loader/>

    return (
        <>
            <div className="flex flex-col items-center justify-center m-5 p-5">
                <h1 className="font-bold text-4xl p-5">{t("app_monitoring")}</h1>
            </div>

            <div className="flex flex-col items-center justify-center">
                <div
                    className="w-full max-w-xl px-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 bg-primary dark:bg-dark_primary dark:border-gray-700">
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">

                            {/* TITLE */}

                            <li className="py-1 pb-3 font-bold font-semibold">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-1 min-w-0 pl-5 ml-4">
                                        <p className="text-gray-900 dark:text-white">
                                            {t("app")}
                                        </p>
                                    </div>
                                    <div className="inline-flex w-1/4 justify-center items-center">
                                        <div
                                            className="p-2 inline-flex items-center">
                                            {t("app_status")}
                                        </div>
                                    </div>

                                </div>
                            </li>

                            {/* DATA */}

                            {websites && websites.map((item, index) => (
                                <div key={item.name}>
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4">
                                            {item.status_backend === "Online" && item.status_frontend === "Online" ? (
                                                <HiWifi className="h-5 w-5 text-green-400" aria-hidden="true"/>
                                            ) : (
                                                <HiWifi className="h-5 w-5 text-red-400" aria-hidden="true"/>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    {item.name}
                                                </p>
                                                <a href={item.url}
                                                   className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    {item.url}
                                                </a>
                                            </div>
                                            <div className="inline-flex w-1/4 justify-center items-center font-semibold">
                                                {item.status_backend === "Online" ? (
                                                    <div
                                                        className="p-2 inline-flex items-center text-base font-semibold text-green-600">
                                                        {item.status_backend}
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="p-2 inline-flex items-center text-base font-semibold text-red-600">
                                                        {item.status_backend}
                                                    </div>
                                                )}
                                                |
                                                {item.status_frontend === "Online" ? (
                                                    <div
                                                        className="p-2 inline-flex items-center text-base font-semibold text-green-600">
                                                        {item.status_frontend}
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="p-2 inline-flex items-center text-base font-semibold text-red-600">
                                                        {item.status_frontend}
                                                    </div>
                                                )}
                                            </div>

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