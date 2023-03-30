import {axiosGet, axiosPost} from "../Others/requests.jsx";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import Loader from "../Components/Loading.jsx";

export default function Jobs() {

    const [name, setName] = useState("")
    const [company, setCompany] = useState("")
    const [url, setUrl] = useState("")


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

    function submitJob() {

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

    if (isLoading) return <Loader/>

    return (
        <>
            <div className="relative m-3 overflow-x-auto shadow-md sm:rounded-lg flex justify-center">
                <form className="text-gray-800 dark:text-white">
                    <input name="name" type="text" className="border-2 border-gray-400 rounded-md p-2 m-2 bg-gray-300 dark:bg-gray-700" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}/>
                    <input name="company" type="text" className="border-2 border-gray-400 rounded-md p-2 m-2 bg-gray-300 dark:bg-gray-700" placeholder="Company" value={company} onChange={(event) => setCompany(event.target.value)}/>
                    <input name="url" type="text" className="border-2 border-gray-400 rounded-md p-2 m-2 bg-gray-300 dark:bg-gray-700" placeholder="URL" value={url} onChange={(event) => setUrl(event.target.value)}/>
                </form>
                <button type="submit" className="border-2 border-gray-400 rounded-md p-2 m-2 bg-gray-300 dark:bg-gray-700" onClick={submitJob}>Submit</button>
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
                    </tr>
                    </thead>
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
                        </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </>
    )
}