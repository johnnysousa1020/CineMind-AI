import { useNavigate } from "react-router-dom";
import "../home/MediaCard.css"

function MediaCard({ media }){
    const image = `https://image.tmdb.org/t/p/w500${media.poster_path}`
    const navigate = useNavigate()

    const title = media.title || media.name;
    const mediaType = media.media_type || media.type

    function handleClick(){
        console.log("Conteúdo clicado:", media)
        console.log("Tipo:", media.media_type)
        console.log("ID:", media.id)

        if(mediaType === "tv" || mediaType === "series"){
            navigate(`/series/${media.id}`)
        }else{
            navigate(`/movies/${media.id}`)
        }
    }

    return(
        <article className="media-card" onClick={handleClick}>
            <div className="media-image">
                <img src={image} alt={title} />
            </div>

            <div className="media-info">
                <h3>{title}</h3>

                <div className="media-details">
                    <span>⭐ {media.vote_average.toFixed(1)}</span>
                    <span>
                        {mediaType === "movie" ? "Filme" : "Série"}
                    </span>
                </div>
            </div>
        </article>
    )
}

export default MediaCard