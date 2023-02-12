// Imports
import {Fragment, useContext, useState} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import {BellIcon, LanguageIcon, MoonIcon, SunIcon, UserIcon} from "@heroicons/react/24/solid/index.js";
import {NavLink} from "react-router-dom";
import {authContext} from "../App.jsx";
import {useQuery} from "@tanstack/react-query";
import {useTranslation} from 'react-i18next';
import useLocalStorage from "use-local-storage";

// Code
const navigation = [
    {name: 'EvPanel', href: '/'},
    {name: 'Dashboard', href: '/dashboard'},
]

const languages = [
    {name: 'Polish', value: 'pl', Image: "/src/Images/Flags/PL.jpg"},
    {name: 'English', value: 'en', Image: "/src/Images/Flags/ENG.jpg"},
]

export default function Navbar() {

    const {isUser, fetchAuthorization} = useContext(authContext)
    const {t, i18n} = useTranslation();

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [theme, setTheme] = useLocalStorage("theme", "dark")

    useQuery(['Authorization'], fetchAuthorization)

    function changeTheme() {
        if (theme === "light") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }

    return (
        <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <Disclosure.Button
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none">
                            <span className="sr-only">Open main menu</span>
                            {sidebarOpen ? (
                                <XMarkIcon onClick={() => setSidebarOpen(!sidebarOpen)} className="block h-6 w-6"
                                           aria-hidden="true"/>
                            ) : (
                                <Bars3Icon onClick={() => setSidebarOpen(!sidebarOpen)} className="block h-6 w-6"
                                           aria-hidden="true"/>
                            )}
                        </Disclosure.Button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img
                                className="block h-8 w-auto lg:hidden"
                                src="src/Images/discord.png"
                                alt="EvPanel"
                            />
                            <img
                                className="hidden h-8 w-auto lg:block"
                                src="src/Images/discord.png"
                                alt="EvPanel"
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <NavLink to={item.href} key={item.name}>
                                        <div
                                            className={
                                                'text-indigo-300 px-3 py-2 rounded-md text-sm font-bold ' +
                                                'hover:text-white hover:bg-indigo-900 hover:shadow hover:shadow-indigo-600'
                                            }
                                        >

                                            {item.name}
                                        </div>
                                    </NavLink>

                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        {isUser() ? (
                            <div
                                className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    type="button"
                                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none hover:bg-gray-700 hover:text-white"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-5 w-5 text-white" aria-hidden="true"/>
                                </button>

                                {/* Profile dropdown */}
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
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items
                                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg divide-y divide-indigo-300">
                                            <Menu.Item>
                                                <NavLink to="/logout" key="logout">
                                                    <span
                                                        className='block px-4 py-2 text-sm text-gray-700'
                                                    >
                                                        Sign out
                                                    </span>
                                                </NavLink>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <div className="hidden sm:block">
                                                    <div
                                                        className="flex flex-1 items-center justify-center items-stretch justify-start">
                                                        {languages.map((item) => (
                                                            <div
                                                                className="mx-2 my-2 text-base font-medium border border-indigo-300">
                                                                <img src={item.Image} key={item.value}
                                                                     onClick={() => i18n.changeLanguage(item.value)}
                                                                     className="h-5 w-8" alt="EvPanel"/>
                                                            </div>

                                                        ))}
                                                    </div>
                                                </div>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        ) : (
                            <NavLink to="/login" key="login">
                                <div className="hidden sm:block">
                                    <div
                                        className="
                                                                inline-flex w-full justify-center rounded-lg border border-gray-900 bg-indigo-900 px-4 py-2 text-sm font-medium text-white shadow-sm
                                                                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                    >
                                        Account
                                    </div>
                                </div>
                                <div className="block sm:hidden">
                                    <div
                                        className="
                                                                inline-flex w-full justify-center rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm"
                                    >
                                        <UserIcon className="h-5 w-5" aria-hidden="true"/>
                                    </div>
                                </div>
                            </NavLink>
                        )}

                    </div>
                    <div
                        className="hidden sm:block rounded-full bg-gray-800 p-1 ml-3 text-gray-400 hover:text-white focus:outline-none hover:bg-gray-700 hover:text-white">
                        <LanguageIcon className="h-5 w-5 text-white"></LanguageIcon>
                    </div>
                    <div
                        className="rounded-full bg-gray-800 p-1 ml-3 text-gray-400 hover:text-white focus:outline-none hover:bg-gray-700 hover:text-white"
                        onClick={() => {changeTheme()}}>
                        {theme === "dark" ? (
                            <MoonIcon className="h-5 w-5 text-white"></MoonIcon>
                        ) : (
                            <SunIcon className="h-5 w-5 text-white"></SunIcon>
                        )}
                    </div>

                </div>
            </div>


            {/* Phone - Menu*/}
            <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 text-white divide-y divide-indigo-300">
                    {navigation.map((item) => (
                        <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className={'block px-3 py-2 text-base font-medium'}
                        >
                            {item.name}
                        </Disclosure.Button>
                    ))}
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        {languages.map((item) => (
                            <Disclosure.Button
                                key={item.name}
                                as="a"
                                className='block px-3 py-3 text-base font-medium'
                            >
                                <img src={item.Image} key={item.value} onClick={() => i18n.changeLanguage(item.value)}
                                     className="h-5 w-8" alt="EvPanel"/>
                            </Disclosure.Button>
                        ))}
                    </div>
                </div>
            </Disclosure.Panel>
        </Disclosure>
    )
}
