import { useEffect, useState } from "react"
import { FiUser, FiEdit3, FiHeart, FiClock, FiMessageCircle, FiFilm, FiTv, FiX, FiSave } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { getHistory } from "../utils/history"
import { getFavorites } from "../services/favoriteService"
import "../pages/Profile.css"

function Profile(){
    const navigate = useNavigate()
    const [history, setHistory] = useState([])
    const [favorites, setFavorites] = useState([])

    const [profile, setProfile] = useState({
        name: "Johnny",
        favoriteGenre: "Suspense"
    })

    const [isEditing, setIsEditing] = useState(false)
    const [editProfile, setEditProfile] = useState(profile)

    function loadProfileData(){
        const savedHistory = getHistory()
        const savedFavorites = getFavorites()

        setHistory(savedHistory)
        setFavorites(savedFavorites)

        const savedProfile = localStorage.getItem("cinemind_profile")

        if(savedProfile){
            const parsedProfile = JSON.parse(savedProfile)

            setProfile(parsedProfile)
            setEditProfile(parsedProfile)
        }
    }

    useEffect(() => {
        loadProfileData()

        window.addEventListener(
            "favoritesUpdated",
            loadProfileData
        )

        return () => {
            window.removeEventListener(
                "favoritesUpdated",
                loadProfileData
            )
        }
    }, [])

    function handleOpenEdit(){
        setEditProfile(profile)
        setIsEditing(true)
    }

    function handleCloseEdit(){
        setIsEditing(false)
    }

    function handleChange(event){
        const { name, value } = event.target

        setEditProfile(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSaveProfile(event){
        event.preventDefault()

        if(!editProfile.name.trim()){
            return
        }

        const updatedProfile = {
            ...editProfile,

            name: editProfile.name.trim(),

            favoriteGenre: editProfile.favoriteGenre.trim()
        }

        localStorage.setItem(
            "cinemind_profile",
            JSON.stringify(updatedProfile)
        )

        setProfile(updatedProfile)
        setIsEditing(false)
    }

    const totalConversations = history.length
    const totalFavorites = favorites.length

    const totalMovies = favorites.filter(
        media => media.media_type === "movie"
    ).length

    const totalSeries = favorites.filter(
        media => media.media_type === "tv" || media.media_type === "series"
    ).length

/*
    useEffect(() => {
        const savedHistory = getHistory()

        setHistory(savedHistory)

        const savedProfile = localStorage.getItem("cinemind_profile")

        if(savedProfile){
            setProfile(JSON.parse(savedProfile))
        }
    }, [])

    const movieCount = history.reduce((total, conversation) => {
        return total + conversation.messages.filter(
            message => message.recommendations?.some(
                media => media.media_type === "movie"
            )
        ).length
    }, 0)

    function handleEditProfile(){
        const name = prompt(
            "Digite seu nome:",
            profile.name
        )

        if(!name?.trim()) return

        const updatedProfile = {
            ...profile,
            name: name.trim()
        }

        setProfile(updatedProfile)

        localStorage.setItem(
            "cinemind_profile",
            JSON.stringify(updatedProfile)
        )
    }
*/

    return(
        <main className="profile-page">
            <section className="profile-header">
                <div className="profile-avatar">
                    <FiUser />
                </div>

                <div className="profile-user-info">
                    <h1>
                        {profile.name}
                    </h1>

                    <samp>
                        Apaixonado por filmes e séries 🎬
                    </samp>
                </div>

                <button className="profile-eidt-button" onClick={handleOpenEdit}>
                    <FiEdit3 />
                    Editar perfil
                </button>
            </section>

            <section className="profile-stats">
                <article className="profile-star-card">
                    <div className="profile-star-icon">
                        <FiFilm />
                    </div>

                    <div>
                        <strong>
                            {totalMovies}
                        </strong>

                        <span>
                            Filmes favoritos
                        </span>
                    </div>
                </article>

                <article className="profile-star-card">
                    <div className="profile-star-icon">
                        <FiTv />
                    </div>

                    <div>
                        <strong>
                            {totalSeries}
                        </strong>

                        <span>
                            Séries favoritos
                        </span>
                    </div>
                </article>

                <article className="profile-star-card">
                    <div className="profile-star-icon">
                        <FiHeart />
                    </div>

                    <div>
                        <strong>
                            {totalFavorites}
                        </strong>

                        <span>
                            Favoritos
                        </span>
                    </div>
                </article>

                <article className="profile-star-card">
                    <div className="profile-star-icon">
                        <FiMessageCircle />
                    </div>

                    <div>
                        <strong>
                            {totalConversations}
                        </strong>

                        <span>
                            Conversas
                        </span>
                    </div>
                </article>
            </section>

            <section className="profile-section">
                <div className="profile-section-header">
                    <div>
                        <h2>
                            Suas atividades
                        </h2>

                        <p>
                            Acesse rapidamente seus conteúdos.
                        </p>
                    </div>
                </div>

                <div className="profile-actions">
                    <button onClick={() => navigate("/favorites")}>
                        <FiHeart />

                        <div>
                        <strong>
                            Favoritos
                        </strong>

                        <span>
                            Seus filmes e séries favoritos
                        </span>
                    </div>
                    </button>


                    <button onClick={() => navigate("/history")}>
                        <FiClock />

                        <div>
                        <strong>
                            Histórico
                        </strong>

                        <span>
                            Suas conversas com o CineMind AI
                        </span>
                    </div>
                    </button>

                    <button onClick={() => navigate("/settings")}>
                        <FiEdit3 />

                        <div>
                            <strong>
                                Configurações
                            </strong>

                            <span>
                                Personalize sua experiência
                            </span>
                        </div>
                    </button>
                </div>
            </section>

            {isEditing && (
                <div className="profile-modal-overlay" onClick={handleCloseEdit}>
                    <div className="profile-modal" onClick={(event) => event.stopPropagation()}>
                        <div className="profile-modal-header">
                            <div>
                                <h2>
                                    Editar perfil
                                </h2>

                                <p>
                                    Atualize suas informações
                                </p>
                            </div>

                            <button className="profile-modal-close" onClick={handleCloseEdit}>
                                <FiX />
                            </button>
                        </div>

                        <form className="profile-form" onSubmit={handleSaveProfile}>
                            <div className="profile-form-group">
                                <label>
                                    Nome
                                </label>

                                <input 
                                type="text"
                                name="name"
                                value={editProfile.name}
                                onChange={handleChange}
                                placeholder="Seu nome" />
                            </div>

                            <div className="profile-form-group">

                                <label>
                                    Gênero favorito
                                </label>

                                <input 
                                type="text"
                                name="favoriteGenre"
                                value={editProfile.favoriteGenre}
                                onChange={handleChange}
                                placeholder="Ex: Suspense" />
                            </div>

                            <div className="profile-form-buttons">
                                <button 
                                type="button"
                                className="profile-cancel-button"
                                onClick={handleCloseEdit}>
                                    Cancelar
                                </button>

                                <button
                                type="submit"
                                className="profile-save-button">
                                    <FiSave />
                                    
                                    Salvar alterações
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Profile