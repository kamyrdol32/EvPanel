import {axiosDelete, axiosGet, axiosPost} from "../Others/requests.jsx";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {toast} from "react-toastify";
import {TrashIcon} from '@heroicons/react/24/outline'
import Loader from "../Components/Loader.jsx";

export default function Jobs() {

    const [name, setName] = useState("")
    const [company, setCompany] = useState("")
    const [url, setUrl] = useState("")

    const [search, setSearch] = useState("")

    const [jobs, setJobs] = useState([])
    const {isLoading} = useQuery(['Jobs'], fetchJobs)

    function fetchJobs() {
        const data = axiosGet("/api/v1/job/get", {}, true)

        data.then((response) => {
                setJobs(response.data)
            }
        )

        return data
    }

    function fetchSearch(text) {
        setSearch(text)
        const data = axiosGet("/api/v1/job/get", {search: text}, true)

        data.then((response) => {
                setJobs(response.data)
            }
        )

        return data
    }

    function submitJob() {

        if (name === "" || company === "" || url === "") {
            toast.error("Please fill out all fields")
            return false
        }

        const data = {
            name: name,
            company: company,
            url: url
        }

        axiosPost("/api/v1/job/add", data, true)
            .then((response) => {
                fetchJobs()
                setName("")
                setCompany("")
                setUrl("")
            })
    }

    function deleteJob(id) {
        const data = axiosDelete("/api/v1/job/delete", {id: id}, true)
            .then((response) => {
                fetchJobs()
            })
    }

    if (isLoading) return <Loader/>

    return (
        <>
            <div className="relative m-3 p-1 overflow-x-auto shadow-md sm:rounded-lg flex justify-center">
                <input name="search" type="text" placeholder="Search..." className="w-full border-2 border-gray-400 rounded-md p-2 bg-gray-300 dark:bg-gray-700" value={search} onChange={(event) => fetchSearch(event.target.value)}/>
            </div>


            <div className="relative m-3 overflow-x-auto shadow-md sm:rounded-lg border-2 border-gray-400">
                <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead
                        className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nr.
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Company
                        </th>
                        <th scope="col" className="px-6 py-3">
                            URL
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                    </thead>

                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-4 py-4 flex items-center">
                            <p className="font-semibold">
                                -
                            </p>
                        </td>
                        <td className="px-4 py-2">
                            <p className="font-semibold">
                                <input name="name" type="text"
                                       className="rounded-md p-2 bg-gray-300 dark:bg-gray-700"
                                       placeholder="Name" value={name}
                                       onChange={(event) => setName(event.target.value)}/>
                            </p>
                        </td>
                        <td className="px-4 py-2">
                            <p className="font-semibold">
                                <input name="company" type="text"
                                       className="rounded-md p-2 bg-gray-300 dark:bg-gray-700"
                                       placeholder="Company" value={company}
                                       onChange={(event) => setCompany(event.target.value)}/>
                            </p>
                        </td>
                        <td className="px-4 py-2">
                            <p className="font-semibold">
                                <input name="url" type="text"
                                       className="rounded-md p-2 bg-gray-300 dark:bg-gray-700"
                                       placeholder="URL" value={url} onChange={(event) => setUrl(event.target.value)}/>
                            </p>
                        </td>
                        <td className="px-6 py-2">
                            <p className="font-semibold">
                                -
                            </p>
                        </td>

                        <td className="px-4 py-2">
                            <p className="font-semibold">
                                <button type="submit"
                                        className="rounded-md p-2 bg-gray-300 dark:bg-gray-700"
                                        onClick={submitJob}>Submit
                                </button>
                            </p>
                        </td>
                    </tr>
                    </tbody>

                    {/* Data*/}
                    {jobs && jobs.map((item, index) => (
                        <tbody key={item.id} className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 flex items-center">
                                <p className="font-semibold">
                                    {index + 1}
                                </p>
                            </td>
                            <td className="px-6 py-4">
                                <p className="font-semibold">
                                    {item.name}
                                </p>
                            </td>
                            <td className="px-6 py-4">
                                <p className="font-semibold">
                                    {item.company}
                                </p>
                            </td>
                            <td className="px-6 py-4">
                                <p className="font-semibold">
                                    <a href={item.url}>{item.url}</a>
                                </p>
                            </td>
                            <td className="px-6 py-4">
                                <p className="font-semibold">
                                    {item.created_data}
                                </p>
                            </td>
                            <td className="px-4 py-4">
                                <p className="font-semibold flex">
                                    <TrashIcon className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 text-red-500" onClick={() => deleteJob(item.id)}/>
                                </p>
                            </td>
                        </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </>
    )
}