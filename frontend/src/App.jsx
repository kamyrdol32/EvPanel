// CSS
import 'react-toastify/dist/ReactToastify.css';


// Imports
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Register from "./Sites/Register";
import {ToastContainer} from "react-toastify";

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
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </BrowserRouter>
        </div>
    )
}

export default App
