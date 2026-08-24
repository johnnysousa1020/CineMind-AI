import { useNavigate } from "react-router-dom";
import MediaCarousel from "./MediaCarousel";
import "../home/MediaSection.css"

function MediaSection({ title, media, loading }){
    const navigate = useNavigate()
    const isAIRecommendations = title.includes("Recomendados pela IA")

    return(
        <section className="media-section">
            <div className="section-header">
                <h2>{title}</h2>
            </div>

            {loading ? (

                <div className="media-loading">
                    Carregando conteúdos...
                </div>

            ) : media?.length > 0 ? (

                <MediaCarousel medias={media}/>

            ) : isAIRecommendations ? (
                <div className="ai-empty-state">
                    <div className="ai-empty-icon">
                        🤖
                    </div>

                    <div className="ai-empty-content">
                        <h3>
                            Ainda não temos recomendações para você
                        </h3>

                        <p>
                            Converse com o CineMind AI e descubra
                            filmes e séries que combinam com você.
                        </p>

                        <button onClick={() => navigate("/assistant")}>
                            Conversar com a IA
                        </button>
                    </div>
                </div>

            ) : (
                
                <p className="media-empty">
                    Nenhum conteúdo disponível no momento.
                </p>
            )}
        </section>
    )
}

export default MediaSection