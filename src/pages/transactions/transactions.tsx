import { useState, useEffect } from 'react';
import Modal from '../../components/modal/modal';
import ConfirmationModal from '../../components/confirmation-modal/confirmation-modal';
import { useForm } from 'react-hook-form';
import { transactionData } from "../../data/transactiondata";
import { categoryData } from "../../data/categorydata";

const Transactions = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [editIndex, setEditIndex] = useState<any>(null);

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
            transactionData[editIndex] = data;
        } else {
            transactionData.push(data);
        }
        closeModal();
    };


    const handleAdd = () => {
        setModalTitle('Add Transaction');
        openModal();
    }

    const handleEdit = (index: number) => {
        const transactionToEdit = transactionData[index];
        setValue("description", transactionToEdit.description)
        setValue("amount", transactionToEdit.amount)
        setValue("date", transactionToEdit.date)
        setValue("category", transactionToEdit.category)
        setValue("type", transactionToEdit.type)
        setModalTitle('Edit Transaction');
        setEditIndex(index);
        openModal();
    };

    const handleDelete = (index: number) => {
        openConfirmationModal(index);
    };

    const onDelete = () => {
        if (editIndex !== null) {
            transactionData.splice(editIndex, 1);
            closeConfirmationModal();
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Transactions</h1>
                <button onClick={handleAdd} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                    Add Transaction
                </button>
            </div>

            {/* Transactions Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b text-left">Date</th>
                            <th className="px-4 py-2 border-b text-left">Description</th>
                            <th className="px-4 py-2 border-b text-right">Amount</th>
                            <th className="px-4 py-2 border-b text-left">Type</th>
                            <th className="px-4 py-2 border-b text-left">Category</th>
                            <th className="px-4 py-2 border-b text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionData.map((transaction, index) => (
                            <tr key={transaction.id}>
                                <td className="px-4 py-2 border-b">{transaction.date}</td>
                                <td className="px-4 py-2 border-b">{transaction.description}</td>
                                <td className="px-4 py-2 border-b text-right">${transaction.amount.toFixed(2)}</td>
                                <td className="px-4 py-2 border-b">
                                    <span className={`px-2 py-1 rounded-full text-white ${transaction.type === "Income" ? "bg-green-500" : "bg-red-500"}`}>
                                        {transaction.type}
                                    </span>
                                </td>
                                <td className="px-4 py-2 border-b">{transaction.category}</td>
                                <td className="px-4 py-2 border-b text-center">
                                    <button onClick={() => handleEdit(index)} className="text-blue-500 hover:text-blue-700 mr-2">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(index)} className="text-red-500 hover:text-red-700">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Adding/Editing Transaction */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="text-sm font-bold text-gray-700">Date</label>
                        <input
                            type="date"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                            {...register("date", { required: "Date is required" })}
                        />
                        {errors.date && <span className="text-red-500 text-sm">{errors.date.message?.toString()}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="text-sm font-bold text-gray-700">Description</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                            {...register("description", { required: "Description is required" })}
                        />
                        {errors.description && <span className="text-red-500 text-sm">{errors.description.message?.toString()}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="text-sm font-bold text-gray-700">Amount</label>
                        <input
                            type="number"
                            step="0.01"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                            {...register("amount", { required: "Amount is required", min: 0.01 })}
                        />
                        {errors.amount && <span className="text-red-500 text-sm">{errors.amount.message?.toString()}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="text-sm font-bold text-gray-700">Type</label>
                        <select
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                            {...register("type", { required: "Type is required" })}
                        >
                            <option value="Expense">Expense</option>
                            <option value="Income">Income</option>
                        </select>
                        {errors.type && <span className="text-red-500 text-sm">{errors.type.message?.toString()}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="text-sm font-bold text-gray-700">Category</label>
                        <select
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                            {...register("category", { required: "Category is required" })}
                        >
                            {categoryData.filter(cat => cat.type === watch('type')).map((cat, index) => (
                                <option key={index} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                        {errors.category && <span className="text-red-500 text-sm">{errors.category.message?.toString()}</span>}
                    </div>

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        {editIndex ? "Update" : "Add"}
                    </button>
                </form>
            </Modal>

            {/* Confirmation Modal for Deletion */}
            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={closeConfirmationModal}
                onConfirm={onDelete}
                message="Are you sure you want to delete this transaction?"
            />
        </div>
    );
};

export default Transactions;
