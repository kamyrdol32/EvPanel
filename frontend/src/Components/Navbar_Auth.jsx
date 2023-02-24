// Imports
import {NavLink} from "react-router-dom";
import {UserIcon} from "@heroicons/react/24/solid/index.js";
import {useTranslation} from "react-i18next";

// Code
export default function Navbar_Auth() {

    const { t, i18n } = useTranslation();

    return (<NavLink to="/login" key="login">
            <div className="hidden sm:block">
                <div
                    className="
                        inline-flex w-full justify-center rounded-lg border border-gray-900 bg-indigo-900 px-4 py-2 text-sm font-medium text-white shadow-sm
                        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                >
                    {t("account")}
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
        </NavLink>)
}