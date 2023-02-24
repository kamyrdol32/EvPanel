// Imports
import {useContext, useState} from "react";
import {axiosPost} from "../Others/requests.jsx";
import {NavLink, useNavigate} from "react-router-dom";
import {authContext} from "../App.jsx";
import {useTranslation} from "react-i18next";

// Code
export default function Login() {

    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const {setUser} = useContext(authContext)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function fetchLogin() {

        const data = {
            email: email,
            password: password,
        }

        axiosPost("/auth/login", data)
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.user) {
                        setUser(response.data.user)
                    }
                    setUser(response.data.user)
                    navigate("/")
                }
                ;
                if (response.data.avatar) {
                    localStorage.setItem("avatar", response.data.avatar)
                }
            })
    }

    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {t("sign_in_to_your_account")}
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
                                className="
                                relative block w-full appearance-none rounded-none rounded-t-md border border-indigo-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm
                                text-gray-800  bg-white placeholder-gray-800
                                dark:text-white dark:bg-gray-800 dark:placeholder-white
                                "
                                placeholder="Email address"
                                onChange={(e) => setEmail(e.target.value)}
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
                                className="
                                relative block w-full appearance-none rounded-none rounded-t-md border border-indigo-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm
                                text-gray-800  bg-white placeholder-gray-800
                                dark:text-white dark:bg-gray-800 dark:placeholder-white
                                " placeholder={t("password")}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                {t("rember_me")}
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-300">
                                {t("forgot_your_password?")}
                            </a>
                        </div>
                    </div>
                </form>


                <div className="space-y-1">
                    <button
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={fetchLogin}
                    >
                        {t("sign_in")}
                    </button>
                    <div>
                        <NavLink to="/register" key="register">
                            <button
                                className="
                                group relative flex w-full justify-center rounded-md border border-gray-900 py-2 px-4 text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                                text-gray-800  bg-white
                                dark:text-white dark:bg-gray-800
                                "
                                onClick={fetchLogin}
                            >
                                {t("sign_up")}
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}