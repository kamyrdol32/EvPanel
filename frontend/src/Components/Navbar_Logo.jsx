// Imports

// Code
export default function Navbar_Logo() {
    return (
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
    )
}