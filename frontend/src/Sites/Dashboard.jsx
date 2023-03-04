// Imports
import {useState} from "react";


// Code
export default function Dashboard() {

    const dashboard = [
    {name: 'Lista użytkowników', component: users()},
    {name: 'Lista serwerów', component: 'servers'},
    {name: 'Lista usług', component: 'services'},
    {name: 'Lista faktur', component: 'invoices'},
]

    const [component, setComponent] = useState(users())

    function users () {
        return (
            <div className="flex flex-col items-center justify-center space-y-4 m-3">
                <div className="font-bold text-xl">
                    Lista użytkowników
                </div>
            </div>
        )
    }


    return (
        <div className="flex">
            <div
                className="w-1/5 min-h-screen bg-gray-200 dark:bg-gray-700 dark:text-white p-5 divide-y divide-gray-400">

                <div className="flex flex-col items-center justify-center space-y-4 m-3">
                    <div>
                        <img
                            className="w-36 object-cover rounded-full"
                            src="src/Images/evgaming.png"
                            alt="EvPanel"
                        />
                    </div>
                    <div className="font-bold text-xl">
                        EvGaming
                    </div>
                    <div
                        className='px-3 py-2 rounded-md text-sm font-bold text-white bg-indigo-900 shadow shadow-indigo-600'>
                        Zmień serwer
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center space-y-2 m-3 p-3">
                    {dashboard.map((item) => (
                        <div key={item.name} onClick={() => setComponent(item.component)}>
                            <div
                                className={
                                    'text-indigo-600 rounded-md font-bold p-1'
                                }
                            >
                                {item.name}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <div className="w-4/5 min-h-screen">
                {component}
            </div>
        </div>
    )
}