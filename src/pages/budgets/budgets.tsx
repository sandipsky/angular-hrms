import { useState } from "react";
import { useForm } from "react-hook-form";
import { budgetData } from "../../data/budgetdata";
import DropdownMenu from "../../components/dropdown/dropdown";
import Modal from "../../components/modal/modal";
import ConfirmationModal from "../../components/confirmation-modal/confirmation-modal";

const Budgets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmatationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [dropdownMenuIndex, setdropdownMenuIndex] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm<any>({
    mode: "onChange",
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const onSubmit = (data: any) => {
    budgetData.push(data);
    closeModal();
  };

  const toggleMenu = (index: any) => {
    setdropdownMenuIndex(dropdownMenuIndex === index ? null : index);
  };

  const handleEdit = (index: any) => {
    console.log(index)
    setdropdownMenuIndex(null);
    setModalTitle('Edit Budget');
    openModal();
  };

  const handleDelete = (index: any) => {
    console.log(index)
    setdropdownMenuIndex(null);
    openConfirmationModal();
  };

  const onDelete = (index?: any) => {
    budgetData.splice(index, 1);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Budgets</h1>
        <button onClick={openModal} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
          Create New Budget
        </button>
      </div>

      {/* Account Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgetData.map((account, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md relative">
            <div className="flex items-center mb-4 justify-between">
              <div className="flex items-center">
                <img src={account.image} alt={account.name} className="w-10 h-10 mr-4" />
                <h2 className="text-xl font-bold">{account.name}</h2>
              </div>
              <button onClick={() => toggleMenu(index)} className="text-gray-500 hover:text-gray-700">
                •••
                <DropdownMenu isOpen={dropdownMenuIndex === index} onClose={() => setdropdownMenuIndex(null)}>
                  <li onClick={() => handleEdit(index)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer ">
                    Edit
                  </li>
                  <li onClick={() => handleDelete(index)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Delete
                  </li>
                </DropdownMenu>
              </button>
            </div>

            <p className="text-blue-500 text-2xl font-semibold">${account.total}</p>
            <div className="mt-4">
              <div className="text-sm text-gray-600 mb-1">{account.items} {account.items > 1 ? 'items' : 'item'}</div>
              <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
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

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle} disableClose={true}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter account name"
              {...register("name", { required: "Budget Name is required" })}
            />
            {errors.name && (<span className="text-red-500 text-sm">{errors.name.message?.toString()}</span>)}
          </div>
          <div className="mb-4">
            <label className="text-gray-700 text-sm font-bold mb-2">Total Budget</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter total budget"
              {...register("total", { required: "Budget is required" })}
            />
            {errors.total && (<span className="text-red-500 text-sm">{errors.total.message?.toString()}</span>)}
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
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
      </Modal>

      <ConfirmationModal isOpen={isConfirmatationModalOpen} onConfirm={onDelete} onClose={closeConfirmationModal} message={"Are You Sure You Want to Delete?"}></ConfirmationModal>

    </div>
  );
};

export default Budgets;
