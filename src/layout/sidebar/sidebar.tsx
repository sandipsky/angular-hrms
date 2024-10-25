import { Link, useLocation } from "react-router-dom";
import { navData } from "../../data/navdata";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
    const location = useLocation();
    
    return (
        <div className={`${isOpen ? 'w-[170px]' : 'w-0'} overflow-hidden h-screen bg-gray-800 text-white transition-width duration-300 ease-in-out`}>
            <ul className="px-2 flex flex-col gap-2">
                {navData.map((data) => (
                    <li>
                        <Link to={data.link} className={`block hover:bg-gray-700 px-6 py-2 rounded ${location.pathname === data.link ? 'bg-gray-600' : 'bg-transparent'}`}>{data.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
