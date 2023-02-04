// CSS
import './App.css'


// Imports
import {useState, useEffect} from 'react'
import {axiosGet} from "./others/requests.jsx";


// Code
function App() {

    const [data, setData] = useState("dsf")

    useEffect(() => {
        axiosGet("/test", false)
            .then((response) => {
                console.log(response)
                setData(response.data)
            })
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                fdsfd
            </header>
        </div>
    )
}

export default App
