import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { HiOutlineMenu } from "react-icons/hi"
import { FiSearch } from "react-icons/fi"
import { FaRegUserCircle } from "react-icons/fa"
import "../layout/Header.css"

function Header({ toggleSidebar }){
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    function handleSearch(event){
        event.preventDefault()

        const query = search.trim();

        if(!query) return;

        navigate(`/search?query=${encodeURIComponent(query)}`)

        setSearch("")
    }

    function handleProfile(){
        navigate("/profile")
    }


    return (
        <header className="header">
            <div className="header-left">
                <button className="menu-button" onClick={toggleSidebar}>
                    <HiOutlineMenu />
                </button>

                <h1 className="logo">
                    CineMind AI
                </h1>
            </div>


            <form className="header-search" onSubmit={handleSearch}>
                <FiSearch />

                <input 
                type="text" 
                placeholder="Pesquisar filmes ou séries"
                value={search}
                onChange={(event) => setSearch(event.target.value)}/>
            </form>
            
            <div className="header-right">
                <button className="profile-buttonsd" onClick={handleProfile} aria-label="Abrir perfil">
                <FaRegUserCircle />
                </button>
            </div>

        </header>
    )
}

export default Header