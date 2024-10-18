import { Outlet } from "react-router";
import Header from "./header/header";
import Footer from "./footer/footer";
import Sidebar from "./sidebar/sidebar";
import { useState } from "react";

export default function Layout() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {isSidebarOpen && <Sidebar />}
      <div className="flex-1">
        <Header onToggle={toggleSidebar} />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}
