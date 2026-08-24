import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSeriesFull } from "../services/movieService";
import MediaCarousel from "../components/home/MediaCarousel";
import { addFavorite, removeFavorite, isFavorite } from "../services/favoriteService";
import "../pages/SerieDetails.css"

function SerieDetails(){
    const { id } = useParams()
    const [serie, setSerie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showTrailer, setShowTrailer] = useState(false)
    const [favorite, setFavorite] = useState(false)

    useEffect(() => {
        async function loadSerie() {
            try{
                const data = await getSeriesFull(id)

                setSerie(data)
                setFavorite(isFavorite(data.details.id))
            }catch(error){
                console.error("Erro ao buscar detalhes da série:", error)
            }finally{
                setLoading(false)
            }
        }

        loadSerie()
    }, [id])

    if(loading){
        return <p>Carregando detalhes...</p>
    }

    if(!serie){
        return <p>Série não encontrada</p>
    }

    const details = serie.details
    console.log(serie.providers)
    const backgroundImage = `https://image.tmdb.org/t/p/original${details.backdrop_path}`
    const posterImage = `https://image.tmdb.org/t/p/w500${details.poster_path}`
    const year = details.first_air_date?.slice(0, 4)

    function handleFavorite(){
        if(favorite){
            removeFavorite(serie.details.id)
            setFavorite(false)
        }else{
            addFavorite({
                id: serie.details.id,
                title: serie.details.title,
                poster_path: serie.details.poster_path,
                vote_average: serie.details.vote_average,
                media_type: "tv"
            })

            setFavorite(true)
        }
    }

    return(
        <div className="serie-details" style={{ backgroundImage: `url(${backgroundImage})`}}>
        <div className="serie-details-overlay">
            <div className="serie-details-content">
                <img className="serie-poster" src={posterImage} alt={details.name} />

            <div className="serie-info">
                <div className="serie-badges">
                    <span>
                        📺 Série
                    </span>

                    <span>
                        ⭐ {details.vote_average.toFixed(1)}
                    </span>
                </div>

                <h1>
                    {details.name}
                </h1>

                <div className="serie-meta">
                    <span>
                        {year}
                    </span>

                    <span>
                        {details.number_of_seasons} temporadas
                    </span>

                    <span>
                        {details.number_of_episodes} episódios
                    </span>

                    <span>
                        {details.genres?.map(
                            genre => genre.name
                        ).join(" • ")}
                    </span>
                </div>

                <p className="serie-overview">
                    {details.overview}
                </p>

                <div className="serie-actions">

                    <button onClick={() => setShowTrailer(true)} disabled={!serie.trailer}>
                        Assistir Trailer
                    </button>

                    <button onClick={handleFavorite}>
                        {favorite ? "❤️ Remover dos Favoritos" : "🤍 Adicionar aos Favoritos"}
                    </button>
                </div>
            </div>
            </div>

            <section className="cast-section">
                <h2>Elenco Principal</h2>

                <div className="cast-carousel">
                    {serie.cast?.slice(0, 15).map((actor) => (
                        <div className="cast-card" key={actor.id}>
                            <img 
                            src={actor.profile_path ? `https://image.tmdb.org/t/p/w300${actor.profile_path}` : "/placeholder-actor.jpg"} 
                            alt={actor.name} />

                            <div className="cast-info">
                                <h3>{actor.name}</h3>
                                <p>{actor.character}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="providers-section">
                <h2>📺 Onde Assistir</h2>

                <div className="providers-list">
                    {serie.providers?.BR?.flatrate?.length > 0 ? (
                        serie.providers.BR.flatrate.map((provider) => (
                            <div className="provider-card" key={provider.provider_id}>
                                <img src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`} alt={provider.provider_name} />

                                <span>
                                    {provider.provider_name}
                                </span>
                            </div>
                        ))
                    ) : (

                        <p className="no-provider">
                            Streaming não informado para sua região
                        </p>
                    )}
                </div>
            </section>

            <section className="similiar-section">
                <h2>Séries Semelhantes</h2>

                <MediaCarousel 
                medias={serie.recommendations}/>
            </section>
        </div>

        {showTrailer && serie.trailer && (
            <div className="trailer-modal" onClick={() => setShowTrailer(false)}>
                <div className="trailer-container" onClick={(event) => event.stopPropagation()}>
                    <button className="close-trailer" onClick={() => setShowTrailer(false)}>
                        X
                    </button>

                    <iframe 
                    src={`https:www.youtube.com/embed/${serie.trailer.key}?autoplay=1`} 
                    title={`Trailer de ${details.name}`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen></iframe>
                </div>
            </div>
        )}
        </div>
    )
}

export default SerieDetails;