import { useState } from "react";
import { useAuth } from "../../context/authcontext";
import DropdownMenu from "../../components/dropdown/dropdown";
import { Link } from "react-router-dom";

const Header = ({ onToggle }: { onToggle: () => void }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { logout } = useAuth();

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-[12px] font-[700]">
                <button onClick={onToggle}>
                    &#9776;
                </button>
                <h1 className="text-xl">Expense Tracker</h1>
            </div>


            <button onClick={handleDropdownToggle} className="flex items-center gap-[8px]">
                <img src="/person.jpg" alt="person" className="w-[30px] h-[30px] rounded-full" />
                <span className="font-[700]">Sandip Shakya</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>

                <DropdownMenu isOpen={dropdownOpen} onClose={() => setDropdownOpen(false)}>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer w-48">
                        <Link className="w-full" to="/profile">Profile</Link>
                    </li>
                    <li onClick={logout} className="px-4 py-2 hover:bg-gray-200 w-48 cursor-pointer">
                        <span className="w-full">Logout</span>
                    </li>
                </DropdownMenu>
            </button>



        </header>
    );
};

export default Header;
