import { Link } from "react-router-dom";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
    return (
        <div className={`${isOpen ? 'w-[170px]' : 'w-0'} h-screen bg-gray-800 text-white transition-width duration-300 ease-in-out`}>
            <ul className="space-y-2">
                <li>
                    <Link to='/' className="block hover:text-gray-400 hover:bg-gray-700 px-6 py-2 rounded">Home</Link>
                </li>
                <li>
                    <Link to='/transactions' className="block hover:text-gray-400 hover:bg-gray-700 px-6 py-2 rounded">Transactions</Link>
                </li>
                <li>
                    <Link to='/accounts' className="block hover:text-gray-400 hover:bg-gray-700 px-6 py-2 rounded">Accounts</Link>
                </li>
                <li>
                    <Link to='/category' className="block hover:text-gray-400 hover:bg-gray-700 px-6 py-2 rounded">Category</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
