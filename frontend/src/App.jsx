// CSS
import './App.css'


// Imports
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Register from "./Sites/Register";

// Components

// Code
function App() {

    function Home() {
        return (
            <div>
                Home
            </div>
        );
    }

    return (
        <div className="">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
