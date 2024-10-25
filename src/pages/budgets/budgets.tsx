import { useState } from "react";

const Budgets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const accounts = [
    {
      name: 'Shopping',
      total: 2300,
      spent: 150,
      remaining: 2150,
      items: 1,
      image: 'https://via.placeholder.com/50' // replace with actual image URL 
    },
    {
      name: 'Home Decor',
      total: 3800,
      spent: 3300,
      remaining: 500,
      items: 3,
      image: 'https://via.placeholder.com/50' // replace with actual image URL 
    },
    {
      name: 'Garden',
      total: 1500,
      spent: 160,
      remaining: 1340,
      items: 2,
      image: 'https://via.placeholder.com/50' // replace with actual image URL 
    },
    {
      name: 'Car',
      total: 2500,
      spent: 220,
      remaining: 2280,
      items: 1,
      image: 'https://via.placeholder.com/50' // replace with actual image URL 
    },
    {
      name: 'YouTube',
      total: 5000,
      spent: 1100,
      remaining: 3900,
      items: 2,
      image: 'https://via.placeholder.com/50' // replace with actual image URL 
    }
  ];

  // Function to open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 border-red-50 border-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Budgets</h1>
        <button onClick={() => openModal()} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
          Create New Budget
        </button>
      </div>

      {/* Account Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Loop through the accounts array to generate account cards */}
        {accounts.map((account, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              {/* Display the account image */}
              <img src={account.image} alt={account.name} className="w-10 h-10 mr-4" />
              <h2 className="text-xl font-bold">{account.name}</h2>
            </div>
            <p className="text-blue-500 text-2xl font-semibold">${account.total}</p>
            <div className="mt-4">
              <div className="text-sm text-gray-600 mb-1">{account.items} {account.items > 1 ? 'items' : 'item'}</div>
              <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
                {/* Calculate the percentage of spending */}
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(account.spent / account.total) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>${account.spent} Spend</span>
                <span>${account.remaining} Remaining</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-2xl font-bold mb-4">Create New Account</h2>
            <form>
              <div className="mb-4">
                <label className="text-gray-700 text-sm font-bold mb-2">Account Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter account name"
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-700 text-sm font-bold mb-2">Total Budget</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter total budget"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Create
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets;
