import { Outlet } from "react-router-dom";
import Header from "../layout/Header";
import SideBar from "../layout/Sidebar";
import Footer from "../layout/Footer";
import "../layout/MainLayout.css"
import { useState } from "react";

function MainLayout(){
    const [sidebarOpen, setSidebarOpen] = useState(false)

    function toggleSidebar(){
        setSidebarOpen(prev => !prev)
    }

    /*!sidebarOpen*/

    function closeSidebar(){
        setSidebarOpen(false)
    }

    return(
        <>
        <Header toggleSidebar={toggleSidebar}/>

        <div className="layout-container">
            {sidebarOpen && (
                <div className="sidebar-overlay" onClick={closeSidebar}/>
            )}

            <SideBar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>

            <main className={`main-content ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
                <Outlet />
            </main>
        </div>

        <Footer />
        </>
    )
}

export default MainLayout;

