// CSS
import 'react-toastify/dist/ReactToastify.css';


// Components
import Navbar from "./Components/Navbar";
import Login from "./Sites/Login";
import Register from "./Sites/Register";
import Logout from "./Sites/Logout";


// Imports
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {createContext} from "react";
import {axiosPost} from "./Others/requests.jsx";
import {ToastContainer} from "react-toastify";
import useAuth from "./Contexts/Auth.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


// Code
const queryClient = new QueryClient()
export const authContext = createContext()


function App() {

    const {setUser, removeUser, isUser, getUser, fetchAuthorization} = useAuth()

    function Home() {
        return (
            <div>
                Home
            </div>
        );
    }


    function Dashboard() {

        return (
            <div>
                Dashboard
            </div>
        );
    }

    return (
        <div className="min-h-screen dark:bg-gray-600 bg-gray-100">
            <QueryClientProvider client={queryClient}>
                <authContext.Provider value={{setUser, removeUser, isUser, getUser, fetchAuthorization}}>
                    <BrowserRouter>
                        <Navbar/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/logout" element={<Logout/>}/>
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
                </authContext.Provider>
            </QueryClientProvider>
        </div>
    )
}

export default App
