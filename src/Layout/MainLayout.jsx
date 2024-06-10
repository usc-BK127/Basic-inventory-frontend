import { Outlet } from "react-router-dom";

import Sidebar from "../components/SideBar/SideBar";
import Footer from "../pages/Footer/Footer";
import Header from "../pages/Header/Header";

const MainLayout = () => {
  return (
    <div className="max-w-7xl mx-auto bg-white">
      <div className="lg:grid lg:grid-cols-5">
        <nav className="lg:col-span-1 w-12 flex-shrink-0 z-10">
          <Sidebar />
        </nav>
        <main className="lg:col-span-4">
          <Header />
          <div className="bg-[#f8f9fa] py-5 px-5">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
