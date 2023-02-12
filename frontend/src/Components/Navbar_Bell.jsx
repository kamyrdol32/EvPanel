// Imports
import {BellIcon} from "@heroicons/react/24/solid/index.js";

// Code
export default function Navbar_Bell() {
    return (
        <button
            type="button"
            className="flex rounded-full bg-gray-800 p-1 ml-3 text-gray-400 hover:text-white focus:outline-none hover:bg-gray-700 hover:text-white"
        >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-5 w-5 text-white" aria-hidden="true"/>
        </button>
    )
}