// Imports
import {MoonIcon, SunIcon} from "@heroicons/react/24/solid/index.js";
import useLocalStorage from "use-local-storage";
import {useEffect} from "react";

// Code
export default function Navbar_Theme() {

    const [theme, setTheme] = useLocalStorage("theme", window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light")

    useEffect(() => {
        if (theme === "dark") {
            document.getElementById("root").classList.add("dark")
        } else {
            document.getElementById("root").classList.remove("dark")
        }
    }, [theme])

    function changeTheme() {
        if (theme === "light") {
            setTheme("dark")
            document.getElementById("root").classList.remove("dark")
        } else {
            setTheme("light")
            document.getElementById("root").classList.add("dark")
        }
    }

    return (
        <div
            className="flex rounded-full bg-gray-800 p-1 ml-3 text-gray-400 hover:text-white focus:outline-none hover:bg-gray-700 hover:text-white"
            onClick={() => {
                changeTheme()
            }}>
            {theme === "dark" ? (
                <MoonIcon className="h-5 w-5 text-white"></MoonIcon>
            ) : (
                <SunIcon className="h-5 w-5 text-white"></SunIcon>
            )}
        </div>
    )

}