// Imports
import {LockClosedIcon} from "@heroicons/react/20/solid/index.js";
import {useContext, useState} from "react";
import {axiosPost} from "../Others/requests.jsx";
import {useNavigate} from "react-router-dom";
import {authContext} from "../App.jsx";
import {useTranslation} from "react-i18next";

// Code
export default function Register() {

    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const {setIsAuthenticated, setUser} = useContext(authContext)

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function fetchRegister() {

        const data = {
            email: email,
            username: username,
            password: password,
            confirmPassword: confirmPassword
        }

        axiosPost("/api/v1/auth/user/register", data)
            .then((response) => {
                if (response.status === 200) {
                    setUser(response.data.user)
                    navigate("/")
                };
                if (response.data.avatar) {
                    localStorage.setItem("avatar", response.data.avatar)
                }
            })
    }

    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        {t("sign_up_your_account")}
                    </h2>
                </div>
                <form className="space-y-8">
                    <input type="hidden" name="remember" defaultValue="true"/>
                    <div className="space-y-1 shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Email address"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                {t("username")}
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder={t("username")}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                {t("password")}
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder={t("password")}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                {t("repeat_password")}
                            </label>
                            <input
                                id="repeat-password"
                                name="repeat-password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder={t("repeat_password")}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </form>

                <div>
                    <button
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={fetchRegister}
                    >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true"/>
                </span>
                        {t("sign_up")}
                    </button>
                </div>
            </div>
        </div>
    )
}