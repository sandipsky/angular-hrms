const Header = ({ onToggle }: any) => {
    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-2xl">My App</h1>
            <button onClick={onToggle}>
                &#9776; {/* Hamburger icon */}
            </button>
        </header>
    );
};

export default Header;
