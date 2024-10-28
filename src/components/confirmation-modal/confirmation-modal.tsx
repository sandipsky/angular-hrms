import { useRef, useEffect } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void; // Assuming you'll use this for confirming actions
    disableClose?: boolean;
    message: string;
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, disableClose, message }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!disableClose && modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose, disableClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-[50px] z-50 fade-in">
            <div
                ref={modalRef}
                className="bg-white rounded-lg shadow-lg p-6 w-[500px] relative animate-fadeIn"
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h2 className="text-2xl font-bold">Confirmation</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                        &#10005;
                    </button>
                </div>

                {/* Modal Message */}
                <p className="text-gray-700 mb-4">{message}</p>

                {/* Modal Actions */}
                <div className="flex justify-end items-center gap-2">
                    <button
                        onClick={onConfirm} // Call the confirm function on Yes
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        onClick={onClose}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
