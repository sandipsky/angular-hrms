// components/DropdownMenu.tsx
import { useRef, useEffect, ReactNode } from "react";

type DropdownMenuProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

const DropdownMenu = ({ isOpen, onClose, children }: DropdownMenuProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            ref={dropdownRef}
            className="absolute right-0 top-14 bg-white border rounded-lg shadow-md z-10"
        >
            <ul className="py-1 text-left text-black">{children}</ul>
        </div>
    );
};

export default DropdownMenu;
