import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { categoryData } from "../../data/categorydata";
import DropdownMenu from "../../components/dropdown/dropdown";
import Modal from "../../components/modal/modal";
import ConfirmationModal from "../../components/confirmation-modal/confirmation-modal";

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmatationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [dropdownMenuIndex, setdropdownMenuIndex] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState("Expense");

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    setValue("type", "Expense");
  }, [setValue]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
    setValue("type", "Expense");
    setEditIndex(null);
  };

  const openConfirmationModal = (index: number) => {
    setEditIndex(index);
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    setEditIndex(null);
  };

  const onSubmit = (data: any) => {
    if (editIndex !== null) {
      categoryData[editIndex] = data;
    } else {
      categoryData.push(data);
    }
    closeModal();
  };

  const toggleMenu = (index: number) => {
    setdropdownMenuIndex(dropdownMenuIndex === index ? null : index);
  };

  const handleAdd = () => {
    setModalTitle('Add Category');
    openModal();
  }

  const handleEdit = (index: number) => {
    const budgetToEdit = filteredData[index];
    setValue("name", budgetToEdit.name);
    setValue("total", budgetToEdit.total);
    setValue("type", budgetToEdit.type);
    setModalTitle('Edit Category');
    setEditIndex(index);
    openModal();
  };

  const handleDelete = (index: number) => {
    openConfirmationModal(index);
  };

  const onDelete = () => {
    if (editIndex !== null) {
      categoryData.splice(editIndex, 1);
      closeConfirmationModal();
    }
  };

  const filteredData = categoryData.filter(item => item.type === selectedTab);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Category</h1>
        <button onClick={handleAdd} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
          Create
        </button>
      </div>

      {/* Tabs - Centered and Pill-Shaped */}
      <div className="flex justify-center mb-4">
        <div className="flex bg-gray-200 rounded-full p-1">
          <button
            onClick={() => setSelectedTab("Expense")}
            className={`px-6 py-2 rounded-full ${selectedTab === "Expense" ? "bg-blue-500 text-white" : "text-gray-500"
              }`}
          >
            Expense
          </button>
          <button
            onClick={() => setSelectedTab("Income")}
            className={`px-6 py-2 rounded-full ${selectedTab === "Income" ? "bg-blue-500 text-white" : "text-gray-500"
              }`}
          >
            Income
          </button>
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md relative">
            <div className="flex items-center mb-4 justify-between">
              <div className="flex items-center">
                <h2 className="text-xl font-bold">{item.name}</h2>
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

            <p className="text-blue-500 text-2xl font-semibold">${item.total}</p>
            {item.type == 'Expense' && <div className="mt-4">
              <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(item.spent / item.total) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>${item.spent} Spent</span>
                <span>${item.total - item.spent} Remaining</span>
              </div>
            </div>}
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
              placeholder="Enter category name"
              {...register("name", { required: "Category Name is required" })}
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message?.toString()}</span>}
          </div>

          <div className="mb-4">
            <label className="text-gray-700 text-sm font-bold mb-2">Type</label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              {...register("type", { required: "Type is required" })}
              defaultValue="Expense"
            >
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>
            {errors.type && <span className="text-red-500 text-sm">{errors.type.message?.toString()}</span>}
          </div>

          {watch("type") === "Expense" && (
            <div className="mb-4">
              <label className="text-gray-700 text-sm font-bold mb-2">Budget</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter total budget"
                {...register("total", { required: "Budget is required" })}
              />
              {errors.total && <span className="text-red-500 text-sm">{errors.total.message?.toString()}</span>}
            </div>
          )}

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              {editIndex !== null ? "Update" : "Create"}
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

export default Category;
