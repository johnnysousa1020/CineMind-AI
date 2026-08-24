import { NavLink } from "react-router-dom"
import { HiOutlineHome, HiOutlineFilm, HiOutlineClock, HiOutlineCog } from "react-icons/hi"
import { MdOutlineSmartToy } from "react-icons/md"
import { RiMovie2Line } from "react-icons/ri"
import { FaRegHeart, FaRegUserCircle } from "react-icons/fa"
import "../layout/Sidebar.css"

function SideBar({ sidebarOpen, closeSidebar }){
    return (
        <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
            <nav>
                <NavLink to="/" onClick={closeSidebar}>
                 <HiOutlineHome />
                 <span>Home</span>
                </NavLink>

                <NavLink to="/assistant" onClick={closeSidebar}>
                 <MdOutlineSmartToy />
                 <span>Assistente IA</span>
                </NavLink>

                <NavLink to="/movies" onClick={closeSidebar}>
                 <HiOutlineFilm />
                 <span>Filmes</span>
                </NavLink>

                <NavLink to="/series" onClick={closeSidebar}>
                 <RiMovie2Line />
                 <span>Séries</span>
                </NavLink>

                <NavLink to="/favorites" onClick={closeSidebar}>
                 <FaRegHeart />
                 <span>Favoritos</span>
                </NavLink>

                <NavLink to="/history" onClick={closeSidebar}>
                 <HiOutlineClock />
                 <span>Histórico</span>
                </NavLink>

                <NavLink to="/profile" onClick={closeSidebar}>
                 <FaRegUserCircle />
                 <span>Perfil</span>
                </NavLink>

                <NavLink to="/settings" onClick={closeSidebar}>
                 <HiOutlineCog />
                 <span>Configurações</span>
                </NavLink>
            </nav>
        </aside>
    )
}

export default SideBar