const Header = ({ onToggle }: any) => {
    return (
        <header className="bg-gray-800 text-white p-4 flex items-center gap-[12px]">
            <button onClick={onToggle}>
                &#9776; 
            </button>
            <h1 className="text-xl">Expense Tracker</h1>
        </header>
    );
};

export default Header;
