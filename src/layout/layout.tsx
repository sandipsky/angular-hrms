import { Outlet } from "react-router";
import Header from "./header/header";
import Sidebar from "./sidebar/sidebar";
import { useState } from "react";

export default function Layout() {

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Header onToggle={toggleSidebar} />
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="flex-grow overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
