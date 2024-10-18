const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-4 fixed">
            <h2 className="text-xl font-bold mb-6">Sidebar</h2>
            <ul className="space-y-4">
                <li>
                    <a href="#home" className="hover:text-gray-400">Home</a>
                </li>
                <li>
                    <a href="#about" className="hover:text-gray-400">About</a>
                </li>
                <li>
                    <a href="#services" className="hover:text-gray-400">Services</a>
                </li>
                <li>
                    <a href="#contact" className="hover:text-gray-400">Contact</a>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar
