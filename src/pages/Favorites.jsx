import { useEffect, useState } from "react"
import { getFavorites } from "../services/favoriteService"
import MediaCarousel from "../components/home/MediaCarousel"
import "../pages/Favorites.css"

function Favorites(){
    const [favorites, setFavorites] = useState([])

    function loadFavorites(){
        setFavorites(getFavorites())
    }

    useEffect(() => {
        loadFavorites();

        window.addEventListener("favoritesUpdated", loadFavorites)

        return () => {
            window.removeEventListener("favoritesUpdated", loadFavorites)
        }
    }, [])

    return(
        <div className="favorites-page">
            <h1>⭐ Meus Favoritos</h1>

            {favorites.length > 0 ? (
                <MediaCarousel medias={favorites}/>

            ) : (

                <p>
                    Você ainda não possui favoritos. 
                </p>
            )}
        </div>
    )
}

export default Favorites