// Imports
import {Menu, Transition} from "@headlessui/react";
import {UserIcon} from "@heroicons/react/24/solid/index.js";
import {Fragment} from "react";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

// Code
export default function Navbar_Profile() {

    const {t, i18n} = useTranslation();

    return (
        <Menu as="div" className="relative ml-3">
            <Menu.Button
                className="flex rounded-full p-1 bg-gray-800 text-sm focus:outline-none hover:bg-gray-700 hover:text-white">
                <span className="sr-only">Open user menu</span>
                {localStorage.getItem("avatar") ? (
                    <img
                        className="h-8 w-8 rounded-full"
                        src={localStorage.getItem("avatar")}
                        alt=""
                    />
                ) : (
                    <UserIcon className="h-5 w-5 text-white" aria-hidden="true"/>
                )}

            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="dark:bg-gray-800 bg-gray-100 border-2 border-indigo-300 absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg divide-y divide-indigo-300">
                    <Menu.Item>
                        <NavLink to="/logout" key="logout">
                            <span
                                className='flex block px-4 py-2 text-sm dark:text-gray-100 text-gray-800'
                            >
                                {t("sign_out")}
                            </span>
                        </NavLink>
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}