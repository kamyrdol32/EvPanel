// Components
import Navbar_Logo from "./Navbar_Logo.jsx";
import Navbar_Bell from "./Navbar_Bell.jsx";
import Navbar_Profile from "./Navbar_Profile";
import Navbar_Auth from "./Navbar_Auth";
import Navbar_Language from "./Navbar_Language";
import Navbar_Theme from "./Navbar_Theme";


// Imports
import {useContext, useState} from 'react'
import {Disclosure} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import {NavLink} from "react-router-dom";
import {authContext} from "../App.jsx";
import {useQuery} from "@tanstack/react-query";
import {useTranslation} from 'react-i18next';


// Code
const navigation = [
    {name: 'EvPanel', href: '/'},
    {name: 'jobs', href: '/jobs'},
]

export const languages = [
    {name: 'Polish', value: 'pl', Image: "/src/Assets/Flags/PL.jpg"},
    {name: 'English', value: 'en', Image: "/src/Assets/Flags/ENG.jpg"},
]

export default function Navbar() {

    const {isUser, fetchAuthorization} = useContext(authContext)
    const {t, i18n} = useTranslation();

    const [sidebarOpen, setSidebarOpen] = useState(false)

    useQuery(['Authorization'], fetchAuthorization)

    return (
        <Disclosure as="nav" className="bg-primary dark:bg-dark_primary border-accent">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                        {/* Mobile menu button*/}
                        <Disclosure.Button
                            className="inline-flex items-center justify-center rounded-md p-2 focus:outline-none text-white dark:text-white">
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

                        {/* LOGO */}
                        <Navbar_Logo/>

                        {/* Sites*/}
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <NavLink to={item.href} key={item.name}>
                                        <div
                                            className={
                                                'px-3 py-2 rounded-md text-sm font-bold ' +
                                                'hover:text-white hover:bg-indigo-900 hover:shadow hover:shadow-indigo-600'
                                            }
                                        >

                                            {t(item.name)}
                                        </div>
                                    </NavLink>

                                ))}
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                        {isUser() ? (
                            <div className="flex">
                                {/* Notifications button */}
                                <Navbar_Bell/>

                                {/* Profile dropdown */}
                                <Navbar_Profile/>
                            </div>
                        ) : (
                            <Navbar_Auth/>
                        )}

                        {/* Language button */}
                        <Navbar_Language/>

                        {/* Theme button */}
                        <Navbar_Theme/>
                    </div>


                </div>
            </div>


            {/* Phone - Menu*/}
            <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 divide-y divide-indigo-300">
                    {navigation.map((item) => (
                        <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className={'block px-3 py-2 text-base font-medium'}
                        >
                            {t(item.name)}
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
