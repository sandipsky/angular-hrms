const Card = ({ title, value, icon }: any) => {
    return (
        <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-4 w-full md:w-1/3">
            <div className="text-4xl mb-2">{icon}</div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-xl font-bold">{value}</p>
        </div>
    );
};

export { Card };
