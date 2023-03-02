import React, {useState} from 'react'
import {Navigate, useNavigate, useParams} from 'react-router-dom'
import {axiosGet} from "../Others/requests.jsx";
import {useQuery} from "@tanstack/react-query";
import Loader from "../Components/Loading";

export default function Activate() {

    const {KEY} = useParams(); //get the URL parameters
    const navigate = useNavigate();

    const [time, setTime] = useState(5)
    const {status, isLoading} = useQuery(['Activate'], fetchActivate, {refetchOnWindowFocus: false, retry: false})

    function fetchActivate() {

        const data = {
            KEY: KEY
        }

        return axiosGet("/api/v1/auth/activate", data)
    }

    if (status === "success") {
        setTimeout(() => {
            setTime(time - 1)
            if (time === 0) {
                navigate("/login")
            }
        }, 1000)
    }

    if (status === "error") {
        navigate("/")
    }

    if (isLoading) return <Loader/>

    return (
        <div className="flex flex-col min-h-full items-center justify-center space-y-8 py-24 px-4 sm:px-6 lg:px-8">
            <div className="h1 text-3xl font-bold tra">Account activated</div>
            <div className="flex flex-col items-center justify-center">
                <div className="text-lg">You can now log in to your account</div>
                <div className="text-sm">You will be redirected in {time} seconds</div>
            </div>
        </div>
    )


}