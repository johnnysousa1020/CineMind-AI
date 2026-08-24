import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieFull } from "../services/movieService";
import MediaCarousel from "../components/home/MediaCarousel";
import { addFavorite, removeFavorite, isFavorite } from "../services/favoriteService";
import "../pages/MovieDeatails.css"

function MovieDeatails(){
    const { id } = useParams()

    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showTrailer, setShowTrailer] = useState(false)
    const [favorite, setFavorite] = useState(false)

    useEffect(() => {
        async function loadMovie() {
            try{
                const data = await getMovieFull(id)

                setMovie(data)
                setFavorite(isFavorite(data.details.id))
            }catch(error){
                console.error("Erro ao buscar detalhes do filme:", error)
            }finally{
                setLoading(false)
            }
        }

        loadMovie()
    }, [id])

    if(loading){
        return <p>Carregando detalhes...</p>
    }

    if(!movie){
        return <p>Filme não encontrado.</p>
    }

    const details = movie.details

    const backgroundImage = `https://image.tmdb.org/t/p/original${details.backdrop_path}`

    const posterImage = `https://image.tmdb.org/t/p/w500${details.poster_path}`

    const year = details.release_date?.slice(0, 4)

    function handleFavorite(){
        if(favorite){
            removeFavorite(movie.details.id)
            setFavorite(false)
        }else{
            addFavorite({
                id: movie.details.id,
                title: movie.details.title,
                poster_path: movie.details.poster_path,
                vote_average: movie.details.vote_average,
                media_type: "movie"
            })

            setFavorite(true)
        }
    }


    return(
        <div className="movie-details" style={{ backgroundImage: `url(${backgroundImage})`}}>
            <div className="movie-details-overlay">
                <div className="movie-details-content">
                    <img className="movie-poster" src={posterImage} alt={details.title} />

                    <div className="movie-info">
                        <div className="movie-badges">
                            <span className="movie-type">
                                🎬 Filme
                            </span>

                            <span className="movie-rating">
                                ⭐ {details.vote_average.toFixed(1)}
                            </span>
                        </div>

                        <h1>
                            {details.title}
                        </h1>

                        <div className="movie-meta">
                            <span>{year}</span>

                            <span>
                                {details.runtime} min
                            </span>

                            <span>
                                {details.genres?.map(
                                    genre => genre.name
                                ).join(" • ")}
                            </span>
                        </div>

                        <p className="movie-overview">
                            {details.overview}
                        </p>

                        <div className="movie-actions">

                            <button onClick={() => setShowTrailer(true)} disabled={!movie.trailer}>
                                Assistir Trailer
                            </button>

                            <button onClick={handleFavorite}>
                                {favorite ? "❤️ Remover dos Favoritos" : "🤍 Adicionar aos Favoritos"}
                            </button>
                        </div>
                    </div>
                </div>

                 <section className="cast-section">
                <h2>Elenco Principal:</h2>

                <div className="cast-carousel">
                    {movie.cast?.slice(0, 15).map((actor) => (
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
                <h2>Onde Assistir</h2>

                {movie.providers?.BR ? (
                    <>
                     {movie.providers.BR.flatrate && (
                        <div className="provider-group">
                            <h3>Streaming</h3>

                            <div className="provider-list">
                                {movie.providers.BR.flatrate.map((provider) => (
                                    <div className="provider-card" key={provider.provider_id}>
                                        <img src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`} 
                                        alt={provider.provider_name} />

                                        <span>
                                            {provider.provider_name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                     )}

                     {movie.providers.BR.rent && (
                        <div className="provider-group">
                            <h3>Aluguel</h3>

                            <div className="provider-list">

                                {movie.providers.BR.rent.map((provider) => (
                                    <div className="provider-card" key={provider.provider_id}>
                                        <img src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`} 
                                        alt={provider.provider_name} />

                                        <span>
                                            {provider.provider_name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                     )}
                    </>
                ) : (
                    <p className="no-providers">
                        Nenhuma opção de streaming encontrada no Brasil.
                    </p>
                )}
            </section>

            {movie.recommendations?.length > 0 && (
                <section className="similiar-section">
                    <h2>Filmes Semelhantes</h2>

                    <MediaCarousel 
                    medias={movie.recommendations}
                    />
                </section>
            )}

            </div>



            {showTrailer && movie.trailer && (
                <div className="trailer-modal" onClick={() => setShowTrailer(false)}>
                    <div className="trailer-container" onClick={(event) => event.stopPropagation()}>
                        <button className="close-trailer" onClick={() => setShowTrailer(false)}>
                            X
                        </button>

                        <iframe 
                        src={`https://www.youtube.com/embed/${movie.trailer.key}?autoplay=1`} 
                        title={`Trailer de ${details.title}`}
                        allow="autoplay; encrypted-media"
                        allowFullScreen></iframe>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MovieDeatails;