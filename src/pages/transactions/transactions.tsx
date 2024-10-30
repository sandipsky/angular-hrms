import React, { useState } from 'react';
import Modal from '../../components/modal/modal';
import ConfirmationModal from '../../components/confirmation-modal/confirmation-modal';
import { useForm, SubmitHandler } from 'react-hook-form';

type Transaction = {
    id: number;
    date: string;
    description: string;
    amount: number;
    type: 'Income' | 'Expense';
};

const Transactions: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([
        { id: 1, date: "2023-10-28", description: "Grocery Shopping", amount: 50, type: "Expense" },
        { id: 2, date: "2023-10-27", description: "Salary", amount: 2000, type: "Income" },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);

    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<Transaction>();

    const openAddModal = () => {
        setModalTitle("Add Transaction");
        setCurrentTransaction(null);
        setIsModalOpen(true);
        reset();
    };

    const openEditModal = (transaction: Transaction) => {
        setModalTitle("Edit Transaction");
        setCurrentTransaction(transaction);
        setValue("date", transaction.date);
        setValue("description", transaction.description);
        setValue("amount", transaction.amount);
        setValue("type", transaction.type);
        setIsModalOpen(true);
    };

    const onSubmit: SubmitHandler<Transaction> = (data) => {
        if (currentTransaction) {
            setTransactions((prev) =>
                prev.map((transaction) =>
                    transaction.id === currentTransaction.id ? { ...data, id: transaction.id } : transaction
                )
            );
        } else {
            setTransactions((prev) => [...prev, { ...data, id: Date.now() }]);
        }
        setIsModalOpen(false);
    };

    const openDeleteConfirmation = (transaction: Transaction) => {
        setCurrentTransaction(transaction);
        setIsConfirmationModalOpen(true);
    };

    const confirmDelete = () => {
        if (currentTransaction) {
            setTransactions((prev) => prev.filter((transaction) => transaction.id !== currentTransaction.id));
            setIsConfirmationModalOpen(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Transactions</h1>
            <button
                onClick={openAddModal}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-4"
            >
                Add Transaction
            </button>

            {/* Transactions Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b text-left">Date</th>
                            <th className="px-4 py-2 border-b text-left">Description</th>
                            <th className="px-4 py-2 border-b text-right">Amount</th>
                            <th className="px-4 py-2 border-b text-left">Type</th>
                            <th className="px-4 py-2 border-b text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td className="px-4 py-2 border-b">{transaction.date}</td>
                                <td className="px-4 py-2 border-b">{transaction.description}</td>
                                <td className="px-4 py-2 border-b text-right">${transaction.amount.toFixed(2)}</td>
                                <td className="px-4 py-2 border-b">
                                    <span className={`px-2 py-1 rounded-full text-white ${transaction.type === "Income" ? "bg-green-500" : "bg-red-500"}`}>
                                        {transaction.type}
                                    </span>
                                </td>
                                <td className="px-4 py-2 border-b text-center">
                                    <button onClick={() => openEditModal(transaction)} className="text-blue-500 hover:text-blue-700 mr-2">
                                        Edit
                                    </button>
                                    <button onClick={() => openDeleteConfirmation(transaction)} className="text-red-500 hover:text-red-700">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Adding/Editing Transaction */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalTitle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="text-sm font-bold text-gray-700">Date</label>
                        <input
                            type="date"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                            {...register("date", { required: "Date is required" })}
                        />
                        {errors.date && <span className="text-red-500 text-sm">{errors.date.message}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="text-sm font-bold text-gray-700">Description</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                            {...register("description", { required: "Description is required" })}
                        />
                        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="text-sm font-bold text-gray-700">Amount</label>
                        <input
                            type="number"
                            step="0.01"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                            {...register("amount", { required: "Amount is required", min: 0.01 })}
                        />
                        {errors.amount && <span className="text-red-500 text-sm">{errors.amount.message}</span>}
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
                        {errors.type && <span className="text-red-500 text-sm">{errors.type.message}</span>}
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        {currentTransaction ? "Update" : "Add"}
                    </button>
                </form>
            </Modal>

            {/* Confirmation Modal for Deletion */}
            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={() => setIsConfirmationModalOpen(false)}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete this transaction?"
            />
        </div>
    );
};

export default Transactions;
