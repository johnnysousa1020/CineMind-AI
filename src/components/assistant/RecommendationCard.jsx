import "../../styles/MessageBubble.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMovieTrailer, getSerieTrailer } from "../../services/movieService";

function RecommendationCard({ media }){
    const navigate = useNavigate()
    const [trailerKey, setTrailerKey] = useState(null)

    const title = media.title || media.name;

    const poster = media.poster_path 
    ? `https://image.tmdb.org/t/p/w500${media.poster_path}` 
    : null;

    const rating = media.vote_average 
    ? media.vote_average.toFixed(1)
    : "N/A";

    async function handleTrailer() {
        try{
            const trailer = media.media_type === "movie"
            ? await getMovieTrailer(media.id)
            : await getSerieTrailer(media.id)

            if(!trailer || !trailer.key){
            alert("Trailer não encontrado.")
            return
            }

            setTrailerKey(trailer.key)


        }catch(error){
            console.error("Erro ao buscar trailer:", error)
            alert("Não foi possivel carregar o trailer")
        }
    }

    function closeTrailer(){
        setTrailerKey(null)
    }

    return(
        <>
        <article className="recommendation-card">
            <div className="recommendation-poster-conatainer">

            {poster && (
                <img src={poster} alt={`Poster de ${title}`} className="recommendation-poster" />
            )}

            <div className="recommendation-overlay-ia">
                <button 
                className="recommendation-action" 
                onClick={() => {
                    if(media.media_type === "movie"){
                        navigate(`/movies/${media.id}`)
                    }else{
                        navigate(`/series/${media.id}`)
                    }
                }}>
                    ℹ️ Ver detalhes
                </button>

                <button className="recommendation-action" onClick={handleTrailer}>
                    ▶️ Trailer
                </button>
            </div>
            </div>

            <div className="recommendation-info">
                <h3>{title}</h3>

                <div className="recommendations-meta-ia">

                <div className="recommendation-rating">
                    ⭐ {rating}
                </div>

                <span className="recommendation-type">
                    {media.media_type === "movie"
                     ? "Filme"
                     : "Série"}
                </span>
                </div>
            </div>
        </article>

        {trailerKey && (
            <div className="trailer-modal" onClick={closeTrailer}>
                <div className="trailer-modal-content" onClick={(event) => event.stopPropagation()}>
                    <button className="trailer-close" onClick={closeTrailer}>
                        X
                    </button>

                    <div className="trailer-video-container">
                        <iframe 
                        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`} 
                        title={`Trailer de ${title}`}
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen></iframe>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default RecommendationCard;