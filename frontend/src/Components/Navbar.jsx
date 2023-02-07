// Imports
import {Fragment, useState} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {Bars3Icon, UserIcon, XMarkIcon} from '@heroicons/react/24/outline'
import {ChevronDownIcon} from "@heroicons/react/20/solid/index.js";
import {NavLink} from "react-router-dom";
import {axiosPost} from "../Others/requests.jsx";

// Code
const navigation = [
    {name: 'EvPanel', href: '/'},
    {name: 'Dashboard', href: '#'},
]

export default function Navbar() {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [selectedServer, setSelectedServer] = useState(null)

    function fetchLogin() {

        const data = {
            email: email,
            password: password,
        }

        axiosPost("/auth/login", data)
    }


    return (
        <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <Disclosure.Button
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
                                src="/src/Images/discord.png"
                                alt="EvPanel"
                            />
                            <img
                                className="hidden h-8 w-auto lg:block"
                                src="/src/Images/discord.png"
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
                    <div
                        className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <Menu.Button
                                    className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    {loggedIn ? (
                                        <>
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src="/src/Images/evgaming.png"
                                                alt=""
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <Menu as="div" className="relative inline-block text-left">

                                                {/* Login Button*/}

                                                <div className="hidden sm:block">
                                                    <Menu.Button
                                                        className="
                                                            inline-flex w-full justify-center rounded-lg border border-gray-900 bg-indigo-900 px-4 py-2 text-sm font-medium text-white shadow-sm
                                                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                                    >
                                                        Account
                                                        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5"
                                                                         aria-hidden="true"/>
                                                    </Menu.Button>
                                                </div>
                                                <div className="block sm:hidden">
                                                    <Menu.Button
                                                        className="
                                                            inline-flex w-full justify-center rounded-lg border border-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm"
                                                    >
                                                        <UserIcon className="h-5 w-5" aria-hidden="true"/>
                                                    </Menu.Button>
                                                </div>

                                                {/* Login Panel*/}

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
                                                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-2 ring-black ring-opacity-5 focus:outline-none border">
                                                        <div className="py-2 px-2">
                                                            <input type="hidden" name="remember"
                                                                   defaultValue="true"/>
                                                            <div className="-space-y-px rounded-md shadow-sm">
                                                                <div>
                                                                    <label htmlFor="email-address"
                                                                           className="sr-only">
                                                                        Email address
                                                                    </label>
                                                                    <input
                                                                        id="email-address"
                                                                        name="email"
                                                                        type="email"
                                                                        autoComplete="email"
                                                                        required
                                                                        className="relative block w-full appearance-none rounded-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                        placeholder="Email address"
                                                                        onChange={(event) => setEmail(event.target.value)}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="password" className="sr-only">
                                                                        Password
                                                                    </label>
                                                                    <input
                                                                        id="password"
                                                                        name="password"
                                                                        type="password"
                                                                        autoComplete="current-password"
                                                                        required
                                                                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                        placeholder="Password"
                                                                        onChange={(event) => setPassword(event.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <input
                                                                    id="remember-me"
                                                                    name="remember-me"
                                                                    type="checkbox"
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                />
                                                                <label htmlFor="remember-me"
                                                                       className="ml-2 block text-sm text-gray-900">
                                                                    Remember me
                                                                </label>
                                                            </div>

                                                            <div className="text-sm">
                                                                <a href="#"
                                                                   className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                    Forgot your password?
                                                                </a>
                                                            </div>
                                                            <div className="text-sm">
                                                                <NavLink to="/register" key="register">
                                                                    <a className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                        You don't have account?
                                                                    </a>
                                                                </NavLink>
                                                            </div>
                                                            <div className="flex w-full justify-center">
                                                                <button
                                                                    className="bg-indigo-300 px-5 py-2 rounded rounded-full border border-indigo-600 font-medium"
                                                                    onClick={fetchLogin}
                                                                >

                                                                    Login
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </>
                                    )}

                                < /Menu.Button>
                            </div>
                        </Menu>

                    </div>
                </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => (
                        <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className={'block px-3 py-2 rounded-md text-base font-medium'}
                        >
                            {item.name}
                        </Disclosure.Button>
                    ))}
                </div>
            </Disclosure.Panel>
        </Disclosure>
    )
}
