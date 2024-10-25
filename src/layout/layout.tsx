import { Outlet } from "react-router";
import Header from "./header/header";
import Footer from "./footer/footer";
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
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}
