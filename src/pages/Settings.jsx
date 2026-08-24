import { useEffect, useState } from "react"
import { FiSettings, FiMoon, FiZap, FiFilm, FiTrash2, FiHeart, FiClock, FiUser, FiSave, FiAlertTriangle } from "react-icons/fi"
import { getHistory, clearHistory } from "../utils/history"
import { getFavorites } from "../services/favoriteService"
import "../pages/Settins.css"

function Settings(){
    const [settings, setSettings] = useState({
        animations: true,
        favoriteGenre: "Suspense",
        smartRecommendations: true
    })

    const [historyCount, setHistoryCount] = useState(0)
    const [favoriteCount, setFavoritesCount] = useState(0)
    const [message, setMessage] = useState("")

    function updateCounters(){
        setHistoryCount(
            getHistory().length
        )

        setFavoritesCount(
            getFavorites().length
        )
    }

    useEffect(() => {
        const savedSettings = localStorage.getItem("cinemind_settings")

        if(savedSettings){
            setSettings(
                JSON.parse(savedSettings)
            )
        }

        updateCounters()
    }, [])

    function handleToggle(name){
        setSettings(prev => {
            const updated = {
                ...prev,
                [name]: !prev[name]
            }

            localStorage.setItem(
                "cinemind_settings",
                JSON.stringify(updated)
            )

            return updated
        })
    }

    function handleGenreChange(event){
        const value = event.target.value

        setSettings(prev => ({
            ...prev,
            favoriteGenre: value
        }))
    }

    function handleSavePreferences(){
        localStorage.setItem(
            "cinemind_settings",
            JSON.stringify(settings)
        )

        showMessage(
            "Preferências salvas com sucesso!"
        )
    }

    function handleClearHistory(){
        if(historyCount === 0){
            return
        }

        const confirmed = window.confirm(
            "Tem certeza que deseja apagar todo o histórico de conversas?"
        )

        if(!confirmed){
            return
        }

        clearHistory()

        setHistoryCount(0)

        showMessage(
            "Histórico apagado com sucesso."
        )
    }

    function handleClearFavorites(){
        if(favoriteCount === 0){
            return
        }

        const confirmed = window.confirm(
            "Tem certeza que deseja remover todos os favoritos?"
        )

        if(!confirmed){
            return
        }

        localStorage.removeItem(
            "cinemind_settings"
        )

        window.dispatchEvent(
            new Event("favoritesUpdated")
        )

        setFavoritesCount(0)

        showMessage(
            "Favoritos removidos com sucesso."
        )
    }

    function showMessage(text){
        setMessage(text)

        setTimeout(() => {
            setMessage("")
        }, 3000)
    }

    return(
        <main className="settings-page">
            <header className="settings-header">
                <div className="settings-hedader-icon">
                    <FiSettings />
                </div>

                <div>
                    <h1>
                        Configurações
                    </h1>

                    <p>
                        Personalize sua experiência no CineMind AI.
                    </p>
                </div>
            </header>

            <section className="settings-section">
                <div className="settings-section-title">
                    <FiMoon />

                    <div>
                        <h2>
                            Aparência
                        </h2>

                        <p>
                            Personalize a aparência da aplicação.
                        </p>
                    </div>
                </div>

                <div className="settings-option">
                    <div className="settings-option-icon">
                        <FiZap />
                    </div>

                    <div className="settings-option-content">
                        <strong>
                            Animações
                        </strong>

                        <span>
                            Ativar transições e animações da interface.
                        </span>
                    </div>

                    <button 
                    className={`settings-switch ${settings.animations ? "active" : ""}`}
                    onClick={() => handleToggle("animations")}>
                        <span />
                    </button>
                </div>
            </section>

            <section className="settings-section">
                <div className="settings-section-title">
                    <FiFilm />

                    <div>
                        <h2>
                            Preferências da IA
                        </h2>

                        <p>
                            Diga ao CineMind o que você gosta.
                        </p>
                    </div>
                </div>

                <div className="settings-option-column">

                    <label>
                        Gênero favorito
                    </label>

                    <select value={settings.favoriteGenre} onChange={handleGenreChange}>
                        <option>
                            Ficção científica
                        </option>

                        <option>
                            Suspense
                        </option>

                        <option>
                            Terror
                        </option>

                        <option>
                            Comédia
                        </option>

                        <option>
                            Romance
                        </option>

                        <option>
                            Ação
                        </option>

                        <option>
                            Aventura
                        </option>

                        <option>
                            Drama
                        </option>

                        <option>
                            Fantasia
                        </option>

                        <option>
                            Crime
                        </option>
                    </select>
                </div>

                <div className="settings-option">
                    <div className="settings-option-icon">
                        <FiZap />
                    </div>

                    <div className="settings-option-content">
                        <strong>
                            Recomendações inteligentes
                        </strong>

                        <span>
                            Permitir que a IA use suas preferências para melhorar as recomendações.
                        </span>
                    </div>

                    <button 
                    className={`settings-switch ${settings.smartRecommendations ? "active" : ""}`}
                    onClick={() => handleToggle("smartRecommendations")}>
                        <span />
                    </button>
                </div>

                <button className="settings-save-button" onClick={handleSavePreferences}>
                    <FiSave />

                    Salvar preferências
                </button>
            </section>

            <section className="settings-section">
                <div className="settings-section-title">
                    <FiTrash2 />

                    <div>
                        <h2>
                            Seus dados
                        </h2>

                        <p>
                            Gerencie os dados armazenados pelo CineMind.
                        </p>
                    </div>
                </div>

                <div className="settings-data-grid">
                    <div className="settings-data-card">
                        <div className="settings-data-icon">
                            <FiClock />
                        </div>

                        <div>
                            <strong>
                                Histórico
                            </strong>

                            <span>
                                {historyCount} conversas salvas
                            </span>
                        </div>

                        <button onClick={handleClearHistory}>
                            Limpar
                        </button>
                    </div>

                    <div className="settings-data-card">
                        <div className="settings-data-icon">
                            <FiHeart />
                        </div>

                        <div>
                            <strong>
                                Favoritos
                            </strong>

                            <span>
                                {favoriteCount} conteúdos salvos
                            </span>
                        </div>

                        <button onClick={handleClearFavorites}>
                            Limpar
                        </button>
                    </div>
                </div>
            </section>

            <section className="settings-section">
                <div className="settings-section-title">
                    <FiUser />

                    <div>
                        <h2>
                            Conta
                        </h2>

                        <p>
                            Gerencie suas informações pessoais.
                        </p>
                    </div>
                </div>

                <button className="settings-account-button" /*onClick={() => window.location.href = "/profile"}*/>
                    <FiUser />

                    <div>
                        <strong>
                            Meu Perfil
                        </strong>

                        <span>
                            Alterar suas informações pessoais.
                        </span>
                    </div>
                </button>
            </section>

            <div className="settings-warning">
                <FiAlertTriangle />

                <div>
                    <strong>
                        Sobre seus dados
                    </strong>

                    <p>
                        Suas preferências, favoritos e histórico
                        são armazenados localmente neste dispositivo.
                    </p>
                </div>
            </div>

            {message && (
                <div className="settings-toast">
                    <FiSave />

                    {message}
                </div>
            )}
        </main>
    )
}

export default Settings