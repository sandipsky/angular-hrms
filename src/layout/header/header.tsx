import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../auth/authcontext";

const Header = ({ onToggle }: { onToggle: () => void }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { logout } = useAuth();

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Close the dropdown if clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-[12px]">
                <button onClick={onToggle}>
                    &#9776;
                </button>
                <h1 className="text-xl">Expense Tracker</h1>
            </div>

            <div className="relative" ref={dropdownRef}>
                <button onClick={handleDropdownToggle} className="flex items-center gap-[8px]">
                    <span>Sandip Shakya</span>
                    <img src="/person.jpg" alt="person" className="w-[30px] h-[30px] rounded-full" />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg">
                        <ul className="py-1">
                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                <a href="/profile">Profile</a>
                            </li>
                            <li onClick={logout} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                <a href="/logout">Logout</a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
